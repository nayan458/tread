import pandas as pd
from app.settings import CSV_FILE_PATH


def frequency(data, column_names):
    dt_info = dict()
    ndt_info = dict()
    for col in column_names:
        dt_info[col] = sum(data[data["Drug Target"] == 1][col]) / len(data[data["Drug Target"] == 1][col])
        ndt_info[col] = sum(data[data["Drug Target"] == 0][col]) / len(data[data["Drug Target"] == 0][col])

    return dt_info, ndt_info



def transform_data_for_recharts(ndt_info, dt_info, gene_name, df_gene):
    """
    Transform Django data format into Recharts-compatible format
    
    Parameters:
    ndt_info (dict): Non-drug target information
    dt_info (dict): Drug target information
    gene_name (str): Name of the gene
    df_gene: DataFrame containing gene values
    
    Returns:
    list: List of dictionaries in Recharts format with JSON-serializable values
    """
    # Get all x values (they should be the same for all datasets)
    x_values = list(ndt_info.keys())
    
    # Create the transformed data
    transformed_data = []
    
    for i, x in enumerate(x_values):
        # Convert numpy types to native Python types
        gene_value = df_gene.values[0][i]
        if hasattr(gene_value, 'item'):  # Check if it's a numpy type
            gene_value = gene_value.item()
            
        ndt_value = ndt_info[x]
        if hasattr(ndt_value, 'item'):
            ndt_value = ndt_value.item()
            
        dt_value = dt_info[x]
        if hasattr(dt_value, 'item'):
            dt_value = dt_value.item()
            
        data_point = {
            'name': x,
            'nonDrugTarget': ndt_value,
            'drugTarget': dt_value,
            gene_name.lower(): gene_value
        }
        transformed_data.append(data_point)
    
    return transformed_data


def amino_acid_frequency_plot(gene_name):
    data = pd.read_csv(CSV_FILE_PATH + '20268_reviewed_genes_with_protein_names_and_all_information.csv')
    column_names = ['A', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'Y']
    dt_info, ndt_info = frequency(data, column_names)
    df_gene = data[data['Gene Name'] == gene_name][column_names]

    transformed_data = transform_data_for_recharts(ndt_info, dt_info, gene_name, df_gene)
    # Create the plot data in a format that can be serialized to JSON
    plot_data = {
        'data': transformed_data,
        # [
        #     {
        #         'x': list(ndt_info.keys()),
        #         'y': list(ndt_info.values()),
        #         'name': 'Non-Drug Target',
        #     },
        #     {
        #         'x': list(dt_info.keys()),
        #         'y': list(dt_info.values()),
        #         'name': 'Drug Target',
        #     },
        #     {
        #         'x': list(dt_info.keys()),
        #         'y': df_gene.values[0].tolist(),  # Convert numpy array to list
        #         'name': gene_name,
        #     }
        # ],
        'layout': {
            'xaxis_title': f'Frequency of Gene {gene_name} compared to average frequency of Drug Targets and Non-Drug Targets',
            'yaxis_title': 'Frequency of each Amino Acid',
        }
    }

    return plot_data


def post_translational_modification_frequency_plot(gene_name):
    data = pd.read_csv(CSV_FILE_PATH + '20268_reviewed_genes_with_protein_names_and_all_information.csv')
    column_names = ['N-linked Glycosylation', 'O-linked Glycosylation', 'Phosphoserine', 'Phosphothreonine',
                    'Phosphotyrosine']
    dt_info, ndt_info = frequency(data, column_names)
    df_gene = data[data['Gene Name'] == gene_name][column_names]

    # Create the plot data in a format that can be serialized to JSON
    transformed_data = transform_data_for_recharts(ndt_info, dt_info, gene_name, df_gene)
    plot_data = {
        'data': transformed_data,
        # [
        #     {
        #         'x': list(ndt_info.keys()),
        #         'y': list(ndt_info.values()),
        #         'name': 'Non-Drug Target',
        #     },
        #     {
        #         'x': list(dt_info.keys()),
        #         'y': list(dt_info.values()),
        #         'name': 'Drug Target',
        #     },
        #     {
        #         'x': list(dt_info.keys()),
        #         'y': df_gene.values[0].tolist(),  # Convert numpy array to list
        #         'name': gene_name,
        #     }
        # ],
        'layout': {
            'xaxis_title': f'Frequency of Gene {gene_name} compared to average frequency of Drug Targets and Non-Drug Targets',
            'yaxis_title': 'Frequency of each Post-translational Modification',
        }
    }

    return plot_data


def secondary_structure_frequency_plot(gene_name):
    data = pd.read_csv(CSV_FILE_PATH + '20268_reviewed_genes_with_protein_names_and_all_information.csv')
    column_names = ['Alpha Helix', 'Beta Strand', 'Coils']
    dt_info, ndt_info = frequency(data, column_names)
    df_gene = data[data['Gene Name'] == gene_name][column_names]

    transformed_data = transform_data_for_recharts(ndt_info, dt_info, gene_name, df_gene)
    # Create the plot data in a format that can be serialized to JSON
    plot_data = {
        'data': transformed_data,
        # [
        #     {
        #         'x': list(ndt_info.keys()),
        #         'y': list(ndt_info.values()),
        #         'name': 'Non-Drug Target',
        #     },
        #     {
        #         'x': list(dt_info.keys()),
        #         'y': list(dt_info.values()),
        #         'name': 'Drug Target',
        #     },
        #     {
        #         'x': list(dt_info.keys()),
        #         'y': df_gene.values[0].tolist(),  # Convert numpy array to list
        #         'name': gene_name,
        #     }
        # ],
        'layout': {
            'xaxis_title': f'Frequency of Gene {gene_name} compared to average frequency of Drug Targets and Non-Drug Targets',
            'yaxis_title': 'Frequency of each Secondary Structure',
        }
    }

    return plot_data


def ml_predictions_plot(predictions):
    # Base scores for each model
    scores = {
        'randomforestclassifier': ['Random Forest', 67.21],
        'supportvectormachine': ['Support Vector Machine', 64.57],
        'gradientboosting': ['Gradient Boosting', 85.32],
        'multilayerperceptron': ['Multilayer Perceptron', 84.95]
    }
    
    # Separate data into drug targets and non-drug targets
    drug_targets = []
    non_drug_targets = []
    
    for pred in predictions.keys():
        if pred in scores.keys():
            data_point = {
                "model": scores[pred][0],
                "accuracy": scores[pred][1]
            }
            
            if predictions[pred] == '1.0':
                drug_targets.append(data_point)
            else:
                non_drug_targets.append(data_point)
    
    # Create plot configuration data
    plot_data = {
        "data": [
            {
                "name": "Non-Drug Target",
                "values": non_drug_targets
            },
            {
                "name": "Drug Target",
                "values": drug_targets
            }
        ],
        "layout": {
            "xaxis_title": "Accuracy",
            "yaxis_title": "null"
        }
    }
    
    return plot_data


def categorized_amino_acid_frequency_plot(gene_name):
    # Read data
    data = pd.read_csv(
        CSV_FILE_PATH + '20268_reviewed_genes_with_protein_names_and_all_ml_models_with_categorized_amino_acids.csv')
    column_names = ['Acidic', 'Basic', 'Aliphatic', 'Aromatic', 'Polar']
    dt_info, ndt_info = frequency(data, column_names)
    df_gene = data[data['Gene Name'] == gene_name][column_names]
    transformed_data = transform_data_for_recharts(ndt_info, dt_info, gene_name, df_gene)
    # Create the data structure
    plot_data = {
        "data": transformed_data,
        # "data": [
        #     {
        #         "name": "Non-Drug Target",
        #         "x": list(ndt_info.keys()),
        #         "y": list(ndt_info.values())
        #     },
        #     {
        #         "name": "Drug Target",
        #         "x": list(dt_info.keys()),
        #         "y": list(dt_info.values())
        #     },
        #     {
        #         "name": gene_name,
        #         "x": list(dt_info.keys()),
        #         "y": df_gene.values[0].tolist()
        #     }
        # ],
        "layout": {
            "xaxis_title": f"Frequency of Gene {gene_name} compared to average frequency of Drug Targets and Non-Drug Targets",
            "yaxis_title": "Frequency of each Category of Amino Acids",
        }
    }
    
    return plot_data	