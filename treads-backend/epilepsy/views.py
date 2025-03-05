from django.http import JsonResponse
from django.shortcuts import render
from pymed import PubMed

import pandas as pd
import json

from epilepsy.models import Features
from epilepsy.models import Drugtarget
from epilepsy.models import UniprotAed
from epilepsy.models import Aed

from epilepsy.plots import plotting_properties
from app.settings import CSV_FILE_PATH
from app.settings import PICKLE_FILE_PATH

from django.middleware.csrf import get_token
from django.views.decorators.http import require_http_methods

import logging
from django.views.decorators.csrf import csrf_exempt
from django.core.cache import cache

columns = ['Uniprot ID', 'Gene', 'Uniprot Name', 'Protein Name', 'Sequence Length', 'A', 'C', 'D', 'E',
           'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'Y', 'Sequence',
           'Gene Expression data (Bgee)', 'Organ Expression', 'N-linked Glycosylation',
           'O-linked Glycosylation', 'Phosphoserine', 'Phosphothreonine', 'Phosphotyrosine', 'Hydrophobicity',
           'Low Complexity Regions',
           'Isoelectric Point', 'Alpha Helix', 'Beta Strand', 'Coils', 'PEST Motifs', 'Gene Expression in brain',
           'Drug Target', 'Support Vector Machine',
           'Gradient Boosting', 'Random Forest Classifier', 'Multilayer Perceptron', 'Signal Peptide', ]


@require_http_methods(["GET"])
def get_csrf_token(request):
    return JsonResponse({'csrf_token': get_token(request)})

def index(request):
    return JsonResponse({'message': "Hello, world. You're at the polls index."})

def search(request, search_id=None):
    return render(request, 'index.html', {'search_id': search_id})


def aedtargetpage(request):
    # dt_data = Drugtarget.objects.all()
    dt_data = Drugtarget.objects.all()
    dt_df = pd.DataFrame(list(dt_data.values()))

    dt_df['aed'] = [aed.replace('(', ' ').replace(')', '').split(',') for aed in dt_df['aed']]
    # print(dt_df)
    dt_data = UniprotAed.objects.all()
    dt_df = pd.DataFrame(
        list(dt_data.values('uniprotid', 'uniprotid__genename', 'aedname__drugbankid', 'aedname__status', 'aedname')))
    # grp_df = dt_df.groupby(['uniprotid__genename'])

    return render(request, 'aedtarget.html', {'dt_df': dt_df})

def pubmed_articles(query):
    # Create a PubMed object that GraphQL can use to query
    # Note that the parameters are not required but kindly requested by PubMed Central
    # https://www.ncbi.nlm.nih.gov/pmc/tools/developers/
    pubmed = PubMed(tool="MyTool", email="my@email.address")

    # Create a GraphQL query in plain text
    query = '"' + query + '" and "epilepsy"'
    # print(query)

    limit = 500

    # Execute the query against the API
    results = pubmed.query(query, max_results=limit)

    num = pubmed.getTotalResultsCount(query)

    # print(num,"Search Results Found...\nShowing the first",limit)
    # print()
    # Loop over the retrieved articles

    article_dict = dict()
    for article in results:
        # Extract and format information from the article
        article_id = article.pubmed_id.split('\n')[0]
        title = article.title
        article_dict[title] = article_id

    # print(article_dict)
    return (num, article_dict)



logger = logging.getLogger(__name__)
@csrf_exempt
@require_http_methods(["POST"])
def result(request):
    """
    Handle gene search requests and return detailed gene information.
    
    Args:
        request: HTTP request containing search parameters in JSON format
            Expected format: {
                'gene': str,  # Search query
                'search_id': str  # One of: UniprotID, GeneName, EnsemblID, Sequence
            }
    
    Returns:
        JsonResponse with gene data or error details
    """
    try:
        # Validate request method and parse JSON
        try:
            data = json.loads(request.body)
            search_query = data.get('gene')
            search_id = data.get('search_id')
            
            if not search_query or not search_id:
                return JsonResponse({
                    'error': 'Missing required fields: gene or search_id'
                }, status=400)
                
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

        # Check cache
        cache_key = f"gene_search:{search_id}:{search_query}"
        cached_result = cache.get(cache_key)
        if cached_result:
            return JsonResponse(cached_result)

        # Query database based on search type
        try:
            if search_id == 'UniprotID':
                q_set = Features.objects.filter(uniprotid__exact=search_query)
            elif search_id == 'GeneName':
                q_set = Features.objects.filter(genename__exact=search_query.upper())
                if not q_set.exists():
                    q_set = Features.objects.filter(genename__exact=search_query)
            elif search_id == 'EnsemblID':
                q_set = Features.objects.filter(bgeeid__exact=search_query)
            elif search_id == 'Sequence':
                q_set = Features.objects.filter(sequence__contains=search_query)
            else:
                return JsonResponse({
                    'error': 'Invalid search_id. Must be one of: UniprotID, GeneName, EnsemblID, Sequence'
                }, status=400)
        except Exception as e:
            logger.error(f"Database query error: {str(e)}", exc_info=True)
            return JsonResponse({'error': 'Database query failed'}, status=500)

        if not q_set.exists():
            return JsonResponse({
                'error': 'No data found',
                'gene_id': search_query,
                'search_id': search_id
            }, status=404)

        try:
            # Process feature data
            data = q_set.values()[0]
            df = pd.DataFrame([data])

            # Column mapping with error handling
            column_mapping = {
                'Gene': 'genename',
                'Protein Name': 'protein_name',
                'Uniprot ID': 'uniprotid',
                'Uniprot Name': 'uniprotname',
                'Gene Expression data (Bgee)': 'bgeeid',
                'Sequence Length': 'length',
                'Low Complexity Regions': 'lcr',
                'Isoelectric Point': 'isoelectricpoint',
                'Alpha Helix': 'alphahelix',
                'Beta Strand': 'betastrand',
                'Coils': 'coils',
                'PEST Motifs': 'pestmotifs',
                'N-linked Glycosylation': 'nlinkedglycosylation',
                'O-linked Glycosylation': 'olinkedglycosylation',
                'Phosphoserine': 'phosphoserine',
                'Phosphothreonine': 'phosphothreonine',
                'Hydrophobicity': 'hydrophobicity',
                'Signal Peptide': 'signal_peptide',
                'Gene Expression in brain': 'brainexpression',
                'Organ Expression': 'organexpression'
            }

            # Create filtered DataFrame with error handling
            filtered_df = pd.DataFrame()
            for new_col, old_col in column_mapping.items():
                if old_col in df.columns:
                    filtered_df[new_col] = df[old_col]
                else:
                    logger.warning(f"Column {old_col} not found in data")
                    filtered_df[new_col] = None

            filtered_df.index = pd.Index(['Value'], name='Properties')
            filtered_df = filtered_df.round(2)

            # Process brain expression data
            brain_expr = filtered_df.loc['Value', 'Gene Expression in brain']
            filtered_df.loc['Value', 'Gene Expression in brain'] = (
                'Present' if brain_expr == '1' else
                'Absent' if brain_expr == '0' else
                'Unknown'
            )

            # Get drug target label
            label = 'Drug Target' if q_set[0].drugtarget == '1' else 'Non-Drug Target'

            # Get epilepsy pathways
            try:
                pathway_data = pd.read_csv(f"{CSV_FILE_PATH}All_genes_falling_into_epilepsy_associated_pathways.csv")
                uniprot_id = filtered_df.loc['Value', 'Uniprot ID']
                pathways = None
                if uniprot_id in pathway_data['uniprotid'].values:
                    pathways = pathway_data[pathway_data['uniprotid'] == uniprot_id]['pathway'].values
                    pathways = ', '.join(pathways) if len(pathways) > 1 else pathways[0]
            except Exception as e:
                logger.error(f"Error reading pathway data: {str(e)}")
                pathways = None

            # Get AED data with error handling
            try:
                aeds = Drugtarget.objects.filter(uniprotid__contains=q_set[0].uniprotid)
                aed_dict = {}
                if aeds.exists():
                    aed_list = aeds.values()[0].get('aed', '').split(', ')
                    for one_aed in aed_list:
                        op = Aed.objects.filter(aedname=one_aed)
                        if op.exists():
                            aed_dict[one_aed] = op.values()[0].get('drugbankid')
            except Exception as e:
                logger.error(f"Error fetching AED data: {str(e)}")
                aed_dict = {}

            # Get PubMed articles with error handling
            try:
                protein_name = q_set[0].protein_name
                num, article_dict = pubmed_articles(protein_name)
            except Exception as e:
                logger.error(f"Error fetching PubMed articles: {str(e)}")
                num, article_dict = 0, {}

            # Get ML predictions
            ml_predictions = {k: v for k, v in data.items() if k in [
                'gradientboosting', 'supportvectormachine',
                'randomforestclassifier', 'multilayerperceptron'
            ]}

            # Generate graphs with error handling
            try:
                graph_data = {
                    'graph_1': plotting_properties.amino_acid_frequency_plot(q_set[0].genename),
                    'graph_2': plotting_properties.categorized_amino_acid_frequency_plot(q_set[0].genename),
                    'graph_3': plotting_properties.post_translational_modification_frequency_plot(q_set[0].genename),
                    'graph_4': plotting_properties.secondary_structure_frequency_plot(q_set[0].genename),
                    # 'graph_5': plotting_properties.ml_predictions_plot(ml_predictions)
                }
            except Exception as e:
                logger.error(f"Error generating graphs: {str(e)}")
                graph_data = {}

            # Prepare response data
            response_data = {
                'gene_id': q_set[0].genename,
                'label': label,
                'table': json.loads(filtered_df.T.to_json()),
                'aed_dict': aed_dict,
                'num_articles': num,
                'articles': article_dict,
                'graphs': graph_data,
                'epilepsy_associated_pathways': pathways,
                'ml_predictions': ml_predictions
            }

            # Cache the result
            cache.set(cache_key, response_data, timeout=3600)  # Cache for 1 hour

            return JsonResponse(response_data, safe=False)

        except Exception as e:
            logger.error(f"Error processing data: {str(e)}", exc_info=True)
            return JsonResponse({'error': 'Error processing data'}, status=500)

    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}", exc_info=True)
        return JsonResponse({'error': 'Internal server error'}, status=500)

def common_genes(request):
    try:
        # Ensure the request method is POST
        if request.method != "POST":
            return JsonResponse({"error": "Only POST requests are allowed."}, status=405)

        # Parse the JSON data from the request
        try:
            data = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)

        # Extract 'favorite' genes from JSON payload
        requested_genes = data.get("favorite", [])

        if not isinstance(requested_genes, list) or not requested_genes:
            return JsonResponse({"error": "Invalid or missing 'favorite' field. It should be a list of genes."}, status=400)

        # Load the required data files
        try:
            disorder_data = pd.read_pickle(PICKLE_FILE_PATH + 'All_genes_with_disorders_simple_appeneded_data.pkl')
            eag = pd.read_pickle(PICKLE_FILE_PATH + 'Epilepsy_Associated_genes_with_all_information_Carpe_DB_and_Disorder_data_with_references_Updated.pkl')
        except FileNotFoundError:
            return JsonResponse({"error": "Required data files not found."}, status=500)
        except Exception as e:
            return JsonResponse({"error": f"Error loading data files: {str(e)}"}, status=500)

        # Extract gene lists based on the requested disorders
        result_genes = [
            list(disorder_data[disorder_data['Disorder'] == gene]['Uniprot ID'].values)
            for gene in requested_genes
        ]

        # Ensure result_genes is not empty
        if not result_genes or all(len(genes) == 0 for genes in result_genes):
            return JsonResponse({"error": "No matching genes found for the requested disorders."}, status=404)

        # Find common genes across all requested disorders
        result_genes_common = set(result_genes[0]).intersection(*result_genes)

        if result_genes_common:
            resultant_df = eag[eag['uniprotid'].isin(result_genes_common)]
            return JsonResponse(json.loads(resultant_df.to_json(orient='records')), safe=False)
        else:
            return JsonResponse({"error": "No common genes found among the requested disorders."}, status=404)

    except Exception as e:
        return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)