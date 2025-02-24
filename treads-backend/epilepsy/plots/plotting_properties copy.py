import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import plotly
#from plotly import graph_objs as go # for plotly version less than 3.7.1 (less than version 4)
import plotly.graph_objects as go
import os
from app.settings import CSV_FILE_PATH


def frequency(data, column_names):
    dt_info = dict()
    ndt_info = dict()
    for col in column_names:
        dt_info[col] = sum(data[data["Drug Target"] == 1][col]) / len(data[data["Drug Target"] == 1][col])
        ndt_info[col] = sum(data[data["Drug Target"] == 0][col]) / len(data[data["Drug Target"] == 0][col])

    return dt_info, ndt_info


# def amino_acid_frequency_plot(gene_name):
#     data = pd.read_csv(CSV_FILE_PATH + '20268_reviewed_genes_with_protein_names_and_all_information.csv')
#     column_names = ['A', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'Y']
#     dt_info, ndt_info = frequency(data, column_names)
#     df_gene = data[data['Gene Name'] == gene_name][column_names]

#     trace0 = go.Bar(x=list(ndt_info.keys()), y=list(ndt_info.values()), name='<b>Non-Drug Target</b>',
#                     marker_color='sea green', opacity=0.6)
#     trace1 = go.Bar(x=list(dt_info.keys()), y=list(dt_info.values()), name='<b>Drug Target</b>',
#                     marker_color='powder blue',
#                     opacity=0.6)
#     trace2 = go.Bar(x=list(dt_info.keys()), y=df_gene.values[0], name='<b>' + gene_name + '</b>',
#                     marker_color='light sea green')

#     plots = [trace0, trace1, trace2]

#     layout = go.Layout(autosize=False, hovermode='x',margin=dict(t=40),
#                        xaxis=dict(
#                            title='<b>Frequency of Gene ' + gene_name + ' compared to average frequency of <br> Drug Targets and Non-Drug Targets</b>',
#                            titlefont=dict(
#                                family='Zilla Slab, serif',
#                                size=16,
#                                color='black'
#                            ),
#                            showticklabels=True,
#                            tickangle=0,
#                            tickfont=dict(
#                                family='Zilla Slab, serif',
#                                size=15,
#                                color='black'
#                            ),
#                            exponentformat='e',
#                            showexponent='all'
#                        ),
#                        yaxis=dict(
#                            title='<b>Frequency of each Amino Acid</b>',
#                            titlefont=dict(
#                                family='Zilla Slab, serif',
#                                size=15,
#                                color='black'
#                            ),
#                            showticklabels=True,
#                            tickangle=0,
#                            tickfont=dict(
#                                family='Zilla Slab, serif',
#                                size=15,
#                                color='black'
#                            ),
#                            exponentformat='e',
#                            showexponent='all'
#                        )
#                        )

#     fig = go.Figure(data=plots, layout=layout)
#     fig.update_layout(font=dict(family='Zilla Slab, serif'),width=900, height=500, autosize=False)
#     graph_div = plotly.offline.plot(fig, auto_open=False, output_type="div")
#     return graph_div

def amino_acid_frequency_plot(gene_name):
    data = pd.read_csv(CSV_FILE_PATH + '20268_reviewed_genes_with_protein_names_and_all_information.csv')
    column_names = ['A', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'Y']
    dt_info, ndt_info = frequency(data, column_names)
    df_gene = data[data['Gene Name'] == gene_name][column_names]

    # Create the plot data in a format that can be serialized to JSON
    plot_data = {
        'data': [
            {
                'type': 'bar',
                'x': list(ndt_info.keys()),
                'y': list(ndt_info.values()),
                'name': 'Non-Drug Target',
                'marker': {
                    'color': 'seagreen',
                    'opacity': 0.6
                }
            },
            {
                'type': 'bar',
                'x': list(dt_info.keys()),
                'y': list(dt_info.values()),
                'name': 'Drug Target',
                'marker': {
                    'color': 'powderblue',
                    'opacity': 0.6
                }
            },
            {
                'type': 'bar',
                'x': list(dt_info.keys()),
                'y': df_gene.values[0].tolist(),  # Convert numpy array to list
                'name': gene_name,
                'marker': {
                    'color': 'lightseagreen'
                }
            }
        ],
        'layout': {
            'width': 900,
            'height': 500,
            'autosize': False,
            'hovermode': 'x',
            'margin': {
                't': 40
            },
            'xaxis': {
                'title': {
                    'text': f'Frequency of Gene {gene_name} compared to average frequency of Drug Targets and Non-Drug Targets',
                    'font': {
                        'family': 'Zilla Slab, serif',
                        'size': 16,
                        'color': 'black'
                    }
                },
                'showticklabels': True,
                'tickangle': 0,
                'tickfont': {
                    'family': 'Zilla Slab, serif',
                    'size': 15,
                    'color': 'black'
                },
                'exponentformat': 'e',
                'showexponent': 'all'
            },
            'yaxis': {
                'title': {
                    'text': 'Frequency of each Amino Acid',
                    'font': {
                        'family': 'Zilla Slab, serif',
                        'size': 15,
                        'color': 'black'
                    }
                },
                'showticklabels': True,
                'tickangle': 0,
                'tickfont': {
                    'family': 'Zilla Slab, serif',
                    'size': 15,
                    'color': 'black'
                },
                'exponentformat': 'e',
                'showexponent': 'all'
            },
            'font': {
                'family': 'Zilla Slab, serif'
            }
        }
    }

    return plot_data

# def post_translational_modification_frequency_plot(gene_name):
#     data = pd.read_csv(CSV_FILE_PATH + '20268_reviewed_genes_with_protein_names_and_all_information.csv')
#     column_names = ['N-linked Glycosylation', 'O-linked Glycosylation', 'Phosphoserine', 'Phosphothreonine',
#                     'Phosphotyrosine']
#     dt_info, ndt_info = frequency(data, column_names)
#     df_gene = data[data['Gene Name'] == gene_name][column_names]

#     trace0 = go.Bar(x=list(ndt_info.keys()), y=list(ndt_info.values()), name='<b>Non-Drug Target</b>',
#                     marker_color='sea green', opacity=0.6)
#     trace1 = go.Bar(x=list(dt_info.keys()), y=list(dt_info.values()), name='<b>Drug Target</b>',
#                     marker_color='powder blue',
#                     opacity=0.6)
#     trace2 = go.Bar(x=list(dt_info.keys()), y=df_gene.values[0], name='<b>' + gene_name + '</b>',
#                     marker_color='light sea green')

#     plots = [trace0, trace1, trace2]

#     layout = go.Layout(autosize=False, hovermode='x',
#                        margin=dict(t=40),
#                        xaxis=dict(
#                            title='<b>Frequency of Gene ' + gene_name + ' compared to average frequency of Drug Targets and Non-Drug Targets</b>',
#                            titlefont=dict(
#                                family='Zilla Slab, serif',
#                                size=16,
#                                color='black'
#                            ),
#                            showticklabels=True,
#                            tickangle=0,
#                            tickfont=dict(
#                                family='Zilla Slab, serif',
#                                size=15,
#                                color='black'
#                            ),
#                            exponentformat='e',
#                            showexponent='all'
#                        ),
#                        yaxis=dict(
#                            title='<b>Frequency of each Post-translational Modification</b>',
#                            titlefont=dict(
#                                family='Zilla Slab, serif',
#                                size=16,
#                                color='black'
#                            ),
#                            showticklabels=True,
#                            tickangle=0,
#                            tickfont=dict(
#                                family='Zilla Slab, serif',
#                                size=15,
#                                color='black'
#                            ),
#                            exponentformat='e',
#                            showexponent='all'
#                        )
#                        )

#     fig = go.Figure(data=plots, layout=layout)
#     fig.update_layout(font=dict(family='Zilla Slab, serif'),width=900, height=500, autosize=False)

#     graph_div = plotly.offline.plot(fig, auto_open=False, output_type="div")
#     return graph_div

def post_translational_modification_frequency_plot(gene_name):
    data = pd.read_csv(CSV_FILE_PATH + '20268_reviewed_genes_with_protein_names_and_all_information.csv')
    column_names = ['N-linked Glycosylation', 'O-linked Glycosylation', 'Phosphoserine', 'Phosphothreonine',
                    'Phosphotyrosine']
    dt_info, ndt_info = frequency(data, column_names)
    df_gene = data[data['Gene Name'] == gene_name][column_names]

    # Create the plot data in a format that can be serialized to JSON
    plot_data = {
        'data': [
            {
                'type': 'bar',
                'x': list(ndt_info.keys()),
                'y': list(ndt_info.values()),
                'name': 'Non-Drug Target',
                'marker': {
                    'color': 'seagreen',
                    'opacity': 0.6
                }
            },
            {
                'type': 'bar',
                'x': list(dt_info.keys()),
                'y': list(dt_info.values()),
                'name': 'Drug Target',
                'marker': {
                    'color': 'powderblue',
                    'opacity': 0.6
                }
            },
            {
                'type': 'bar',
                'x': list(dt_info.keys()),
                'y': df_gene.values[0].tolist(),  # Convert numpy array to list
                'name': gene_name,
                'marker': {
                    'color': 'lightseagreen'
                }
            }
        ],
        'layout': {
            'width': 900,
            'height': 500,
            'autosize': False,
            'hovermode': 'x',
            'margin': {
                't': 40
            },
            'xaxis': {
                'title': {
                    'text': f'Frequency of Gene {gene_name} compared to average frequency of Drug Targets and Non-Drug Targets',
                    'font': {
                        'family': 'Zilla Slab, serif',
                        'size': 16,
                        'color': 'black'
                    }
                },
                'showticklabels': True,
                'tickangle': 0,
                'tickfont': {
                    'family': 'Zilla Slab, serif',
                    'size': 15,
                    'color': 'black'
                },
                'exponentformat': 'e',
                'showexponent': 'all'
            },
            'yaxis': {
                'title': {
                    'text': 'Frequency of each Post-translational Modification',
                    'font': {
                        'family': 'Zilla Slab, serif',
                        'size': 16,
                        'color': 'black'
                    }
                },
                'showticklabels': True,
                'tickangle': 0,
                'tickfont': {
                    'family': 'Zilla Slab, serif',
                    'size': 15,
                    'color': 'black'
                },
                'exponentformat': 'e',
                'showexponent': 'all'
            },
            'font': {
                'family': 'Zilla Slab, serif'
            }
        }
    }

    return plot_data

# def secondary_structure_frequency_plot(gene_name):
#     data = pd.read_csv(CSV_FILE_PATH + '20268_reviewed_genes_with_protein_names_and_all_information.csv')
#     column_names = ['Alpha Helix', 'Beta Strand', 'Coils']
#     dt_info, ndt_info = frequency(data, column_names)
#     df_gene = data[data['Gene Name'] == gene_name][column_names]

#     trace0 = go.Bar(x=list(ndt_info.keys()), y=list(ndt_info.values()), name='<b>Non-Drug Target</b>',
#                     marker_color='sea green', opacity=0.6)
#     trace1 = go.Bar(x=list(dt_info.keys()), y=list(dt_info.values()), name='<b>Drug Target</b>',
#                     marker_color='powder blue',
#                     opacity=0.6)
#     trace2 = go.Bar(x=list(dt_info.keys()), y=df_gene.values[0], name='<b>' + gene_name + '</b>',
#                     marker_color='light sea green')

#     plots = [trace0, trace1, trace2]

#     layout = go.Layout(autosize=False, hovermode='x',
#                        margin=dict(t=40),
#                        xaxis=dict(
#                            title='<b>Frequency of Gene ' + gene_name + ' compared to average frequency of Drug Targets and Non-Drug Targets</b>',
#                            titlefont=dict(
#                                family='Zilla Slab, serif',
#                                size=16,
#                                color='black'
#                            ),
#                            showticklabels=True,
#                            tickangle=0,
#                            tickfont=dict(
#                                family='Zilla Slab, serif',
#                                size=15,
#                                color='black'
#                            ),
#                            exponentformat='e',
#                            showexponent='all'
#                        ),
#                        yaxis=dict(
#                            title='<b>Frequency of each Secondary Structure</b>',
#                            titlefont=dict(
#                                family='Zilla Slab, serif',
#                                size=16,
#                                color='black'
#                            ),
#                            showticklabels=True,
#                            tickangle=0,
#                            tickfont=dict(
#                                family='Zilla Slab, serif',
#                                size=15,
#                                color='black'
#                            ),
#                            exponentformat='e',
#                            showexponent='all'
#                        )
#                        )

#     fig = go.Figure(data=plots, layout=layout)
#     fig.update_layout(font=dict(family='Zilla Slab, serif'),width=900, height=500, autosize=False)

#     graph_div = plotly.offline.plot(fig, auto_open=False, output_type="div")
#     return graph_div

def secondary_structure_frequency_plot(gene_name):
    data = pd.read_csv(CSV_FILE_PATH + '20268_reviewed_genes_with_protein_names_and_all_information.csv')
    column_names = ['Alpha Helix', 'Beta Strand', 'Coils']
    dt_info, ndt_info = frequency(data, column_names)
    df_gene = data[data['Gene Name'] == gene_name][column_names]

    # Create the plot data in a format that can be serialized to JSON
    plot_data = {
        'data': [
            {
                'type': 'bar',
                'x': list(ndt_info.keys()),
                'y': list(ndt_info.values()),
                'name': 'Non-Drug Target',
                'marker': {
                    'color': 'seagreen',
                    'opacity': 0.6
                }
            },
            {
                'type': 'bar',
                'x': list(dt_info.keys()),
                'y': list(dt_info.values()),
                'name': 'Drug Target',
                'marker': {
                    'color': 'powderblue',
                    'opacity': 0.6
                }
            },
            {
                'type': 'bar',
                'x': list(dt_info.keys()),
                'y': df_gene.values[0].tolist(),  # Convert numpy array to list
                'name': gene_name,
                'marker': {
                    'color': 'lightseagreen'
                }
            }
        ],
        'layout': {
            'width': 900,
            'height': 500,
            'autosize': False,
            'hovermode': 'x',
            'margin': {
                't': 40
            },
            'xaxis': {
                'title': {
                    'text': f'Frequency of Gene {gene_name} compared to average frequency of Drug Targets and Non-Drug Targets',
                    'font': {
                        'family': 'Zilla Slab, serif',
                        'size': 16,
                        'color': 'black'
                    }
                },
                'showticklabels': True,
                'tickangle': 0,
                'tickfont': {
                    'family': 'Zilla Slab, serif',
                    'size': 15,
                    'color': 'black'
                },
                'exponentformat': 'e',
                'showexponent': 'all'
            },
            'yaxis': {
                'title': {
                    'text': 'Frequency of each Secondary Structure',
                    'font': {
                        'family': 'Zilla Slab, serif',
                        'size': 16,
                        'color': 'black'
                    }
                },
                'showticklabels': True,
                'tickangle': 0,
                'tickfont': {
                    'family': 'Zilla Slab, serif',
                    'size': 15,
                    'color': 'black'
                },
                'exponentformat': 'e',
                'showexponent': 'all'
            },
            'font': {
                'family': 'Zilla Slab, serif'
            }
        }
    }

    return plot_data

# def ml_predictions_plot(predictions):
#     scores = {'randomforestclassifier': ['Random Forest', 67.21],'supportvectormachine': ['Support Vector Machine', 64.57],'gradientboosting': ['Gradient Boosting', 85.32],'multilayerperceptron': ['Multilayer Perceptron', 84.95]}
#     dt_x = []
#     dt_y = []
#     ndt_x = []
#     ndt_y = []
#     for pred in predictions.keys():
#         if pred in scores.keys() and predictions[pred] == '1.0':
#             dt_x.append(scores[pred][1])
#             dt_y.append(scores[pred][0])
#         else:
#             ndt_x.append(scores[pred][1])
#             ndt_y.append(scores[pred][0])
#     trace0 = go.Bar(x=ndt_x, y=ndt_y, name='<b>Non-Drug Target</b>', marker_color='sea green', orientation='h', opacity=0.6)
#     trace1 = go.Bar(x=dt_x, y=dt_y, name='<b>Drug Target</b>', marker_color='powder blue', orientation='h', opacity=0.6)
#     plots = [trace0, trace1]
#     layout = go.Layout(autosize=False, hovermode='y',
#                        margin=dict(l=200, t=40),
#                        xaxis=dict(
#                            title='<b>Accuracy</b>',
#                            titlefont=dict(
#                                family='Zilla Slab, serif',
#                                size=16,
#                                color='black'
#                            ),
#                            showticklabels=True,
#                            tickangle=0,
#                            tickfont=dict(
#                                family='Zilla Slab, serif',
#                                size=15,
#                                color='black'
#                            ),
#                            exponentformat='e',
#                            showexponent='all'
#                        ),
#                        yaxis=dict(
#                            showticklabels=True,
#                            tickangle=0,
#                            tickfont=dict(
#                                family='Zilla Slab, serif',
#                                size=15,
#                                color='black'
#                            ),
#                            exponentformat='e',
#                            showexponent='all',
#                            automargin=True
#                        )
#                        )

#     fig = go.Figure(data=plots, layout=layout)
#     fig.update_layout(showlegend=True)
#     fig.update_layout(font=dict(family='Zilla Slab, serif'),width=900, height=500, autosize=False)
#     graph_div = plotly.offline.plot(fig, auto_open=False, output_type="div")
#     return graph_div

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
                "type": "bar",
                "orientation": "horizontal",
                "name": "Non-Drug Target",
                "color": "seagreen",
                "opacity": 0.6,
                "values": non_drug_targets
            },
            {
                "type": "bar",
                "orientation": "horizontal",
                "name": "Drug Target",
                "color": "powderblue",
                "opacity": 0.6,
                "values": drug_targets
            }
        ],
        "layout": {
            "width": 900,
            "height": 500,
            "margin": {
                "left": 200,
                "top": 40
            },
            "xaxis": {
                "title": "Accuracy",
                "font": {
                    "family": "Zilla Slab, serif",
                    "size": 15
                }
            },
            "yaxis": {
                "font": {
                    "family": "Zilla Slab, serif",
                    "size": 15
                },
                "automargin": True
            },
            "font": {
                "family": "Zilla Slab, serif"
            },
            "showLegend": True
        }
    }
    
    return plot_data

# def categorized_amino_acid_frequency_plot(gene_name):
#     data = pd.read_csv(
#         CSV_FILE_PATH + '20268_reviewed_genes_with_protein_names_and_all_ml_models_with_categorized_amino_acids.csv')
#     column_names = ['Acidic', 'Basic', 'Aliphatic', 'Aromatic', 'Polar']
#     dt_info, ndt_info = frequency(data, column_names)
#     df_gene = data[data['Gene Name'] == gene_name][column_names]

#     trace0 = go.Bar(x=list(ndt_info.keys()), y=list(ndt_info.values()), name='<b>Non-Drug Target</b>',
#                     marker_color='sea green', opacity=0.6)
#     trace1 = go.Bar(x=list(dt_info.keys()), y=list(dt_info.values()), name='<b>Drug Target</b>',
#                     marker_color='powder blue',
#                     opacity=0.6)
#     trace2 = go.Bar(x=list(dt_info.keys()), y=df_gene.values[0], name='<b>' + gene_name + '</b>',
#                     marker_color='light sea green')

#     plots = [trace0, trace1, trace2]

#     layout = go.Layout(autosize=False, hovermode='x',
#                        margin=dict(t=40),
#                        xaxis=dict(
#                            title='<b>Frequency of Gene ' + gene_name + ' compared to average frequency of Drug Targets and Non-Drug Targets</b>',
#                            titlefont=dict(
#                                family='Zilla Slab, serif',
#                                size=16,
#                                color='black'
#                            ),
#                            showticklabels=True,
#                            tickangle=0,
#                            tickfont=dict(
#                                family='Zilla Slab, serif',
#                                size=15,
#                                color='black'
#                            ),
#                            exponentformat='e',
#                            showexponent='all'
#                        ),
#                        yaxis=dict(
#                            title='<b>Frequency of each Category of Amino Acids</b>',
#                            titlefont=dict(
#                                family='Zilla Slab, serif',
#                                size=16,
#                                color='black'
#                            ),
#                            showticklabels=True,
#                            tickangle=0,
#                            tickfont=dict(
#                                family='Zilla Slab, serif',
#                                size=15,
#                                color='black'
#                            ),
#                            exponentformat='e',
#                            showexponent='all'
#                        )
#                        )

#     fig = go.Figure(data=plots, layout=layout)
#     fig.update_layout(font=dict(family='Zilla Slab, serif'),width=900, height=500, autosize=False)

#     graph_div = plotly.offline.plot(fig, auto_open=False, output_type="div")
#     return graph_div
	
def categorized_amino_acid_frequency_plot(gene_name):
    # Read data
    data = pd.read_csv(
        CSV_FILE_PATH + '20268_reviewed_genes_with_protein_names_and_all_ml_models_with_categorized_amino_acids.csv')
    column_names = ['Acidic', 'Basic', 'Aliphatic', 'Aromatic', 'Polar']
    dt_info, ndt_info = frequency(data, column_names)
    df_gene = data[data['Gene Name'] == gene_name][column_names]
    
    # Create the data structure
    plot_data = {
        "data": [
            {
                "type": "bar",
                "name": "Non-Drug Target",
                "color": "seagreen",
                "opacity": 0.6,
                "x": list(ndt_info.keys()),
                "y": list(ndt_info.values())
            },
            {
                "type": "bar",
                "name": "Drug Target",
                "color": "powderblue",
                "opacity": 0.6,
                "x": list(dt_info.keys()),
                "y": list(dt_info.values())
            },
            {
                "type": "bar",
                "name": gene_name,
                "color": "lightseagreen",
                "opacity": 1.0,
                "x": list(dt_info.keys()),
                "y": df_gene.values[0].tolist()
            }
        ],
        "layout": {
            "width": 900,
            "height": 500,
            "margin": {
                "top": 40
            },
            "xaxis": {
                "title": f"Frequency of Gene {gene_name} compared to average frequency of Drug Targets and Non-Drug Targets",
                "font": {
                    "family": "Zilla Slab, serif",
                    "size": 15
                }
            },
            "yaxis": {
                "title": "Frequency of each Category of Amino Acids",
                "font": {
                    "family": "Zilla Slab, serif",
                    "size": 15
                }
            },
            "font": {
                "family": "Zilla Slab, serif"
            },
            "showLegend": True,
            "hovermode": "x"
        }
    }
    
    return plot_data	