from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from pymed import PubMed

import pandas as pd
import numpy as np
import json

from epilepsy.models import Features
from epilepsy.models import Drugtarget
from epilepsy.models import UniprotAed
from epilepsy.models import Aed

from epilepsy.plots import plotting_properties
from app.settings import CSV_FILE_PATH

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

# def result(request):
#     # return HttpResponse("Hello, world. You're at the polls index.")
#     if request.method != 'POST':
#         return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

#     search_query = request.POST.get('gene')
#     search_id = request.POST.get('search_id')
#     q_set = None


#     # Filter based on search type
#     if search_id == 'UniprotID':
#         q_set = Features.objects.filter(uniprotid__exact=search_query)
#     elif search_id == 'GeneName':
#         q_set = Features.objects.filter(genename__exact=search_query.upper())
#         if q_set is not None:
#             q_set = Features.objects.filter(genename__exact=search_query)
#     elif search_id == 'EnsemblID':
#         q_set = Features.objects.filter(bgeeid__exact=search_query)
#     elif search_id == 'Sequence':
#         q_set = Features.objects.filter(sequence__contains=search_query)

#     print(q_set is None)
#     if q_set is None:
#         return JsonResponse({'error': 'No data found', 'gene_id': search_query, 'search_id': search_id}, status=404)


#     data = q_set.values()[0]
#     # return JsonResponse({'error': data}, status=200)
#     print(data)
#     df = pd.DataFrame([data])
    
#     # Renaming the columns as per requirement
#     columns = [
#         'Gene', 'Protein Name', 'Uniprot ID', 'Uniprot Name', 'Gene Expression data (Bgee)', 'Sequence Length',
#         'Low Complexity Regions', 'Isoelectric Point', 'Alpha Helix', 'Beta Strand', 'Coils',
#         'PEST Motifs', 'N-linked Glycosylation', 'O-linked Glycosylation', 'Phosphoserine',
#         'Phosphothreonine', 'Hydrophobicity', 'Signal Peptide', 'Gene Expression in brain',
#         'Organ Expression'
#     ]
#     df.columns = columns
#     df.index = pd.Index(['Value'], name='Properties')
#     df = np.round(df, 2)

#     label = 'Drug Target' if q_set[0].drugtarget == '1' else 'Non-Drug Target'
    
#     # Gene Expression in brain handling
#     if df['Gene Expression in brain'].values[0] == '1':
#         df['Gene Expression in brain'].values[0] = 'Present'
#     elif df['Gene Expression in brain'].values[0] == '0':
#         df['Gene Expression in brain'].values[0] = 'Absent'

#     # return JsonResponse({'q_set': 'df'}, status=200)
#     # Fetching Epilepsy Associated Pathways
#     pathway_data = pd.read_csv(CSV_FILE_PATH + 'All_genes_falling_into_epilepsy_associated_pathways.csv')
#     uniprot_id = df['Uniprot ID'].values[0]
#     pathways = None
#     if uniprot_id in pathway_data['uniprotid'].values:
#         pathways = pathway_data[pathway_data['uniprotid'] == uniprot_id]['pathway'].values
#         pathways = ', '.join(pathways) if len(pathways) > 1 else pathways

#     # Fetching AED data
#     aeds = Drugtarget.objects.filter(uniprotid__contains=q_set[0].uniprotid)
#     aed_dict = {}
#     if aeds.exists():
#         aed_list = aeds.values()[0].get('aed').split(', ')
#         for one_aed in aed_list:
#             op = Aed.objects.filter(aedname=one_aed)
#             if op.exists():
#                 aed_dict[one_aed] = op.values()[0].get('drugbankid')

#     # Fetch PubMed Articles
#     genename = q_set[0].genename
#     protein_name = q_set[0].protein_name
#     num, article_dict = pubmed_articles(protein_name)

#     # ML Predictions
#     predictions = q_set.values()[0]
#     ml_predictions = {k: v for k, v in predictions.items() if k in [
#         'gradientboosting', 'supportvectormachine', 'randomforestclassifier', 'multilayerperceptron'
#     ]}

#     # Graphs for React Frontend
#     graph_data = {
#         'graph_1': plotting_properties.amino_acid_frequency_plot(genename),
#         'graph_2': plotting_properties.categorized_amino_acid_frequency_plot(genename),
#         'graph_3': plotting_properties.post_translational_modification_frequency_plot(genename),
#         'graph_4': plotting_properties.secondary_structure_frequency_plot(genename),
#         'graph_5': plotting_properties.ml_predictions_plot(ml_predictions)
#     }

#     # Formatting response
#     response_data = {
#         'gene_id': genename,
#         'label': label,
#         'table': json.loads(df.T.to_json()),  # Convert DataFrame to JSON
#         'aed_dict': aed_dict,
#         'num_articles': num,
#         'articles': article_dict,
#         'graphs': graph_data,
#         'epilepsy_associated_pathways': pathways,
#         'ml_predictions': ml_predictions
#     }

#     return JsonResponse(response_data, safe=False)

# def result(request):

#     if request.method != 'POST':
#         return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

#     try:
#         data = json.loads(request.body)
#         search_query = data.get('gene')
#         search_id = data.get('search_id')
        
#     except json.JSONDecodeError:
#         return JsonResponse({'error': 'Invalid JSON data'}, status=400)

#     # Filter based on search type
#     if search_id == 'UniprotID':
#         q_set = Features.objects.filter(uniprotid__exact=search_query)
#     elif search_id == 'GeneName':
#         q_set = Features.objects.filter(genename__exact=search_query.upper())
#         if not q_set.exists():
#             q_set = Features.objects.filter(genename__exact=search_query)
#     elif search_id == 'EnsemblID':
#         q_set = Features.objects.filter(bgeeid__exact=search_query)
#     elif search_id == 'Sequence':
#         q_set = Features.objects.filter(sequence__contains=search_query)

#     if not q_set.exists():
#         return JsonResponse({'error': 'No data found', 'gene_id': search_query, 'search_id': search_id}, status=404)

#     data = q_set.values()[0]
#     df = pd.DataFrame([data])
#     # return JsonResponse({"data": df}, status=200)
    
#     # Updated column mapping based on actual database fields
#     column_mapping = {
#         'Gene': 'genename',
#         'Protein Name': 'protein_name',
#         'Uniprot ID': 'uniprotid',
#         'Uniprot Name': 'uniprotname',
#         'Gene Expression data (Bgee)': 'bgeeid',
#         'Sequence Length': 'length',
#         'Low Complexity Regions': 'lcr',
#         'Isoelectric Point': 'isoelectricpoint',
#         'Alpha Helix': 'alphahelix',
#         'Beta Strand': 'betastrand',
#         'Coils': 'coils',
#         'PEST Motifs': 'pestmotifs',
#         'N-linked Glycosylation': 'nlinkedglycosylation',
#         'O-linked Glycosylation': 'olinkedglycosylation',
#         'Phosphoserine': 'phosphoserine',
#         'Phosphothreonine': 'phosphothreonine',
#         'Hydrophobicity': 'hydrophobicity',
#         'Signal Peptide': 'signal_peptide',
#         'Gene Expression in brain': 'brainexpression',
#         'Organ Expression': 'organexpression'
#     }

#     # Create a new DataFrame with the mapped columns
#     filtered_df = pd.DataFrame()
#     for new_col, old_col in column_mapping.items():
#         if old_col in df.columns:
#             filtered_df[new_col] = df[old_col]
#         else:
#             print(f"Warning: Column {old_col} not found in data")
#             filtered_df[new_col] = None

#     # Set index and round numeric values
#     filtered_df.index = pd.Index(['Value'], name='Properties')
#     filtered_df = filtered_df.round(2)

#     label = 'Drug Target' if q_set[0].drugtarget == '1' else 'Non-Drug Target'
    
#     # Handle brain expression
#     if filtered_df.loc['Value', 'Gene Expression in brain'] == '1':
#         filtered_df.loc['Value', 'Gene Expression in brain'] = 'Present'
#     elif filtered_df.loc['Value', 'Gene Expression in brain'] == '0':
#         filtered_df.loc['Value', 'Gene Expression in brain'] = 'Absent'

#     # Fetching Epilepsy Associated Pathways
#     pathway_data = pd.read_csv(CSV_FILE_PATH + 'All_genes_falling_into_epilepsy_associated_pathways.csv')
#     uniprot_id = filtered_df.loc['Value', 'Uniprot ID']
#     pathways = None
#     if uniprot_id in pathway_data['uniprotid'].values:
#         pathways = pathway_data[pathway_data['uniprotid'] == uniprot_id]['pathway'].values
#         pathways = ', '.join(pathways) if len(pathways) > 1 else pathways[0]

#     # Fetching AED data
#     aeds = Drugtarget.objects.filter(uniprotid__contains=q_set[0].uniprotid)
#     aed_dict = {}
#     if aeds.exists():
#         aed_list = aeds.values()[0].get('aed').split(', ')
#         for one_aed in aed_list:
#             op = Aed.objects.filter(aedname=one_aed)
#             if op.exists():
#                 aed_dict[one_aed] = op.values()[0].get('drugbankid')

#     # Fetch PubMed Articles
#     protein_name = q_set[0].protein_name
#     num, article_dict = pubmed_articles(protein_name)

#     # ML Predictions
#     ml_predictions = {k: v for k, v in data.items() if k in [
#         'gradientboosting', 'supportvectormachine', 'randomforestclassifier', 'multilayerperceptron'
#     ]}

#     # Graphs
#     graph_data = {
#         'graph_1': plotting_properties.amino_acid_frequency_plot(q_set[0].genename),
#         'graph_2': plotting_properties.categorized_amino_acid_frequency_plot(q_set[0].genename),
#         'graph_3': plotting_properties.post_translational_modification_frequency_plot(q_set[0].genename),
#         'graph_4': plotting_properties.secondary_structure_frequency_plot(q_set[0].genename),
#         'graph_5': plotting_properties.ml_predictions_plot(ml_predictions)
#     }
#     # return JsonResponse({"status": "success"}, status=200)

#     response_data = {
#         'gene_id': q_set[0].genename,
#         'label': label,
#         'table': json.loads(filtered_df.T.to_json()),
#         'aed_dict': aed_dict,
#         'num_articles': num,
#         'articles': article_dict,
#         'graphs': graph_data,
#         'epilepsy_associated_pathways': pathways,
#         'ml_predictions': ml_predictions
#     }

#     return JsonResponse(response_data, safe=False)

# Result function with proper error handeling



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


# def result(request):
#     if request.method != 'POST':
#         return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

#     search_query = request.POST.get('gene')
#     search_id = request.POST.get('search_id')
#     q_set = None

#     # Filter based on search type
#     if search_id == 'UniprotID':
#         q_set = Features.objects.filter(uniprotid__exact=search_query)
#     elif search_id == 'GeneName':
#         q_set = Features.objects.filter(genename__exact=search_query.upper())
#         if not q_set.exists():
#             q_set = Features.objects.filter(genename__exact=search_query)
#     elif search_id == 'EnsemblID':
#         q_set = Features.objects.filter(bgeeid__exact=search_query)
#     elif search_id == 'Sequence':
#         q_set = Features.objects.filter(sequence__contains=search_query)

#     if not q_set.exists():
#         return JsonResponse({'error': 'No data found', 'gene_id': search_query, 'search_id': search_id}, status=404)

#     data = q_set.values()[0]
#     df = pd.DataFrame([data])
    
#     # Create a mapping of your desired column names to the actual database field names
#     column_mapping = {
#         'Gene': 'genename',
#         'Protein Name': 'protein_name',
#         'Uniprot ID': 'uniprotid',
#         'Uniprot Name': 'uniprotname',
#         'Gene Expression data (Bgee)': 'bgeeid',
#         'Sequence Length': 'sequence_length',
#         'Low Complexity Regions': 'low_complexity_regions',
#         'Isoelectric Point': 'isoelectric_point',
#         'Alpha Helix': 'alpha_helix',
#         'Beta Strand': 'beta_strand',
#         'Coils': 'coils',
#         'PEST Motifs': 'pest_motifs',
#         'N-linked Glycosylation': 'n_glycosylation',
#         'O-linked Glycosylation': 'o_glycosylation',
#         'Phosphoserine': 'phosphoserine',
#         'Phosphothreonine': 'phosphothreonine',
#         'Hydrophobicity': 'hydrophobicity',
#         'Signal Peptide': 'signal_peptide',
#         'Gene Expression in brain': 'brain_expression',  # Assuming this is the correct field name
#         'Organ Expression': 'organ_expression'
#     }

#     # Create a new DataFrame with the mapped columns
#     filtered_df = pd.DataFrame()
#     for new_col, old_col in column_mapping.items():
#         if old_col in df.columns:
#             filtered_df[new_col] = df[old_col]
#         else:
#             print(f"Warning: Column {old_col} not found in data")
#             filtered_df[new_col] = None  # or some default value

#     # Set index and round numeric values
#     filtered_df.index = pd.Index(['Value'], name='Properties')
#     filtered_df = filtered_df.round(2)

#     label = 'Drug Target' if q_set[0].drugtarget == '1' else 'Non-Drug Target'
    
#     # Handle brain expression
#     brain_expression_value = filtered_df.get('Gene Expression in brain', ['0']).values[0]
#     if str(brain_expression_value) == '1':
#         filtered_df.loc['Value', 'Gene Expression in brain'] = 'Present'
#     elif str(brain_expression_value) == '0':
#         filtered_df.loc['Value', 'Gene Expression in brain'] = 'Absent'

#     # Fetching Epilepsy Associated Pathways
#     pathway_data = pd.read_csv(CSV_FILE_PATH + 'All_genes_falling_into_epilepsy_associated_pathways.csv')
#     uniprot_id = filtered_df['Uniprot ID'].values[0]
#     pathways = None
#     if uniprot_id in pathway_data['uniprotid'].values:
#         pathways = pathway_data[pathway_data['uniprotid'] == uniprot_id]['pathway'].values
#         pathways = ', '.join(pathways) if len(pathways) > 1 else pathways[0]

#     # Fetching AED data
#     aeds = Drugtarget.objects.filter(uniprotid__contains=q_set[0].uniprotid)
#     aed_dict = {}
#     if aeds.exists():
#         aed_list = aeds.values()[0].get('aed').split(', ')
#         for one_aed in aed_list:
#             op = Aed.objects.filter(aedname=one_aed)
#             if op.exists():
#                 aed_dict[one_aed] = op.values()[0].get('drugbankid')

#     # Fetch PubMed Articles
#     protein_name = q_set[0].protein_name
#     num, article_dict = pubmed_articles(protein_name)

#     # ML Predictions
#     ml_predictions = {k: v for k, v in data.items() if k in [
#         'gradientboosting', 'supportvectormachine', 'randomforestclassifier', 'multilayerperceptron'
#     ]}

#     # Graphs
#     graph_data = {
#         'graph_1': plotting_properties.amino_acid_frequency_plot(q_set[0].genename),
#         'graph_2': plotting_properties.categorized_amino_acid_frequency_plot(q_set[0].genename),
#         'graph_3': plotting_properties.post_translational_modification_frequency_plot(q_set[0].genename),
#         'graph_4': plotting_properties.secondary_structure_frequency_plot(q_set[0].genename),
#         'graph_5': plotting_properties.ml_predictions_plot(ml_predictions)
#     }

#     response_data = {
#         'gene_id': q_set[0].genename,
#         'label': label,
#         'table': json.loads(filtered_df.T.to_json()),
#         'aed_dict': aed_dict,
#         'num_articles': num,
#         'articles': article_dict,
#         'graphs': graph_data,
#         'epilepsy_associated_pathways': pathways,
#         'ml_predictions': ml_predictions
#     }

#     return JsonResponse(response_data, safe=False)

# def result(request, search_id=None):
#     if request.method == 'POST':
#         search_query = request.POST.get('gene')

#         if search_id == 'UniprotID':
#             q_set = Features.objects.filter(uniprotid__exact=search_query)
#         elif search_id == 'GeneName':
#             q_set = Features.objects.filter(genename__exact=search_query.upper())
#             if len(q_set) == 0:
#                 q_set = Features.objects.filter(genename__exact=search_query)
#         elif search_id == 'EnsemblID':
#             q_set = Features.objects.filter(bgeeid__exact=search_query)
#         elif search_id == 'Sequence':
#             q_set = Features.objects.filter(sequence__contains=search_query)
#         if len(q_set) != 0:

#             data = q_set.values()[0]
#             df = pd.DataFrame([data])  # do not use list() because that will return only the keys and no values
#             #print(df.T)
#             df.columns = columns
#             df = df[
#                 ['Gene', 'Protein Name', 'Uniprot ID', 'Uniprot Name', 'Gene Expression data (Bgee)', 'Sequence Length',
#                  'Low Complexity Regions',
#                  'Isoelectric Point', 'Alpha Helix', 'Beta Strand', 'Coils',
#                  'PEST Motifs', 'N-linked Glycosylation', 'O-linked Glycosylation', 'Phosphoserine',
#                  'Phosphothreonine', 'Hydrophobicity', 'Signal Peptide', 'Gene Expression in brain',
#                  'Organ Expression']]
#             df.index = pd.Index(['Value'], name='Properties')
#             df = np.round(df, 2)
#             #print(df.T)
#             label = 'Drug Target' if q_set[0].drugtarget == '1' else 'Non-Drug Target'

#             if df['Gene Expression in brain'].values[0] == '1':
#                 df['Gene Expression in brain'].values[0] = 'Present'
#             elif df['Gene Expression in brain'].values[0] == '0':
#                 df['Gene Expression in brain'].values[0] = 'Absent'
#             pathway_data = pd.read_csv(CSV_FILE_PATH + 'All_genes_falling_into_epilepsy_associated_pathways.csv')
#             uniprot_id = df['Uniprot ID'].values[0]
#             if uniprot_id in pathway_data['uniprotid'].values:
#                 pathways = pathway_data[pathway_data['uniprotid'] == uniprot_id]['pathway'].values
#                 pathways = ', '.join(pathways) if len(pathways)>1 else pathways
#                 df['Epilepsy Associated Pathways']=pathways
#             # else:
#             # df['Gene Expression in brain'].values[0] = 'No inforamtion available'
#             aeds = Drugtarget.objects.filter(uniprotid__contains=q_set[0].uniprotid)
#             # aeds = 'No Related AEDs Present!!' if len(aeds)==0 else aeds.values()[0].get('aed')
#             aed_dict = dict()
#             if len(aeds) != 0:
#                 aeds = aeds.values()[0].get('aed').split(', ')

#                 for one_aed in aeds:
#                     #print(aeds, one_aed)
#                     op = Aed.objects.filter(aedname=one_aed)
#                     #print(op.values()[0])
#                     drugbank_id = op.values()[0].get('drugbankid')
#                     aed_dict[one_aed] = drugbank_id

#             genename = q_set[0].genename
#             protein_name = q_set[0].protein_name
#             uniprot_id = q_set[0].uniprotid
#             num, article_dict = pubmed_articles(protein_name)
#             # publications = uniprot_publications(uniprot_id)

#             graph_div_1 = plotting_properties.amino_acid_frequency_plot(genename)
#             graph_div_2 = plotting_properties.categorized_amino_acid_frequency_plot(genename)
#             graph_div_3 = plotting_properties.post_translational_modification_frequency_plot(genename)
#             graph_div_4 = plotting_properties.secondary_structure_frequency_plot(genename)

#             predictions = q_set.values()[0]
#             #print('aeds dict is: ', aed_dict, 'its length is ', len(aed_dict))

#             # slicing the dictionary to ge the predictions from the database for this particular gene
#             ml_predictions = {k: v for k, v in predictions.items() if
#                               k in ['gradientboosting', 'supportvectormachine', 'randomforestclassifier',
#                                     'multilayerperceptron']}

#             graph_div_5 = plotting_properties.ml_predictions_plot(ml_predictions)

#             return render(request, 'result.html',
#                           {'gene_id': genename, 'label': label, 'table': df.T, 'length': len(aed_dict),
#                            'aed_dict': aed_dict, 'num': num, 'article_dict': article_dict, 'graph_div_1': graph_div_1,
#                            'graph_div_2': graph_div_2, 'graph_div_3': graph_div_3, 'graph_div_4': graph_div_4,
#                            'graph_div_5': graph_div_5})
#         # return render(request,'result.html', {'gene_id':genename, 'label':label, 'table':df.T, 'length':len(aed_dict), 'aed_dict':aed_dict, 'num':num, 'article_dict':publications})
#         else:
#             return render(request, 'notfound.html', {'gene_id': search_query, 'search_id': search_id})

