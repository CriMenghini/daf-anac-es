import React, { Component } from "react";
import {
  ReactiveBase,
  CategorySearch,
  SingleRange,
  RangeSlider,
  ResultList,
  DataSearch,
  DynamicRangeSlider,
  MultiList,
  ToggleButton,
  MultiDropdownList,
  TagCloud
} from "@appbaseio/reactivesearch";


class ESSearch extends Component {
  render() {
    return (
      <ReactiveBase app="anac_poc" url="http://localhost:9200/" type="gara">
      	<div style={{ display: "flex", flexDirection: "row" }}>
			<div style={{ display: "flex", flexDirection: "column", width: "30%" , paddingRight: "60px"}}>
                <DataSearch
                componentId="searchbox"
                dataField={["id_gara","oggetto_gara", "oggetto_lotto", "cig"]}
                placeholder="Cerca"
                title="Cerca Gara"
                highlight
                style={{paddingBottom: '50px'}}
                react={{
                    and: ["searchbox", "importofilter", "regionefilter", "provinciafilter", "comunefilter", "categoria", "natura_giuridica" ]
                }}
                />
                <DynamicRangeSlider
                        componentId="importofilter"
                        dataField="importoaggiudicazione"
                        title="Importo"
                        showHistogram = {true}
                        style={{paddingBottom: '50px'}}
                        defaultSelected={(min, max) => (
                            {
                            "start": min?min:0,
                            "end": max
                            }
                        )} 
                        rangeLabels={(min, max) => (
                            {
                                "start": "$ "+ min?min:0,
                                "end": "$ "+ max
                            }
                        )}
                        react={{
                            and: ["searchbox", "regionefilter", "provinciafilter", "comunefilter", "categoria", "natura_giuridica" ]
                        }}
                    /> 
                
			<TagCloud
  				componentId="natura_giuridica"
  				dataField="sa_descrizione_natura_giuridica"
			/>
				<ToggleButton
   						componentId="categoria"
 						dataField="descrizione_categoria"
 						 data={
  							  [{"label": "Servizi",   "value": "FORNITURA DI SERVIZI"},
							     {"label": "Infrastrutture stradali",   "value": "OG 3 - STRADE, AUTOSTRADE, PONTI, VIADOTTI, FERROVIE, METROPOLITANE"},
 							    {"label": "Beni", "value": "FORNITURA DI BENI"},
 							     {"label": "Infrastrutture energia", "value": "OG6 - Acquedotti, gasdotti, oleodotti, opere di irrigazione e di evacuazione"},
 							     {"label": "Energia elettrica", "value": "OG10 - Impianti per la trasformazione alta/media tensione e per la distribuzione di energia elettrica in corrente alternata e continua"},
 							     {"label": "Edifici", "value": "OG1 - Edifici civili e industriali"},
 							     {"label": "Altro", "value": "ALTRO (Stazioni appaltanti con sistema di qualificazione proprio)"},
 							     {"label": "Finiture", "value": "OS6 - Finiture di opere generali in materiali lignei, plastici, metallici e vetrosi"},
 							     {"label": "Impianti elettromeccanici", "value": "OS4 - Impianti elettromeccanici trasportatori"},
 							     {"label": "Impianti termici", "value": "OS 28 - IMPIANTI TERMICI E DI CONDIZIONAMENTO"},
 							     {"label": "Opere stradali", "value": "OG3 - Strade, autostrade, ponti, viadotti, ferrovie, metropolitane, funicolari, piste aeroportuali e relative opere complementari"},
 							     {"label": "Componenti strutturali", "value": "OS18 - Componenti strutturali in acciaio o metallo"}
 							     
 							     ]
 							 }
  						title="Descrizione Categoria Gara"
  						
  						multiSelect={true}
  						showFilter={true}
  						URLParams={false}
  						react={{
                            and: ["searchbox", "regionefilter", "provinciafilter", "comunefilter", "categoria", "natura_giuridica" ]
                        }}
					/>
			

         
            </div>
            <div style={{ display: "flex", flexDirection: "column", width: "70%" }}>
                <ResultList
                    componentId="results"
                    title="Risultati"
                    dataField="cig"
                    from={0}
                    size={8}
                    pagination={true}
                    style={{"marginBottom": "10px"}}

                    react={{
                        and: ["searchbox", "importofilter", "regionefilter", "provinciafilter", "comunefilter", "categoria" ]
                    }}
                    onData={res => {
                        return {
                        title: res.cig,
                        description: (
                            <div>
                                <p style={{fontStyle: 'italic'}} dangerouslySetInnerHTML={{__html: res.oggetto_princ_contratto}}></p>
                                <div className="price"><b>Importo aggiudicazione</b>: {res.importoaggiudicazione}€ ; <b>Importo somme liquidate</b>: {res.importosommeliquidate}€ </div>
                                <br></br>
                                <p>Categoria gara: {res.descrizione_categoria} </p>
                                <p>Natura giuridica Stazione Appaltante: {res.sa_descrizione_natura_giuridica}</p>
                                <br></br>
                                <p>Oggetto gara: {res.oggetto_gara} </p>
                                <br></br>
                                <p>Oggetto lotto: {res.oggetto_lotto} </p>
                                <br></br>
                                <p>Data inizio: {res.datainizio} </p>
                                <p>Data fine: {res.dataultimazione} </p>
                                
                                
                            </div>
                        ),
                        };
                    }}
                /> 
            </div>
        </div>
      </ReactiveBase>
    );
  }
}

export default ESSearch;
