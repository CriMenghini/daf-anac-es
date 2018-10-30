# daf-anac-es

Nella repository sono contenuti i seguenti file:

* `data_poc.csv`:
  > Un tab separated file che contiene i risultati della join (outer) tra Smartcig, Lg190 e Simog. E' un subset molto piccolo atto a mostrare la possibilità di integrare i dati provenienti dai diversi dataset.
* `es_push.py`:
  > E' un file che contiene le funzioni utili per creare un nuovo indice su ES.
* `mapping.json`:
  > File `json` che contiene il mapping per l'indice di elastic search. Affinchè il mapping funzioni è necessario apportare delle modifiche ai dati provenienti dalle diverse fonti. Nella fattispecie:
    - Del dataset Lg190 si considerano solo i recordo il cui cig è riconosciuto da ANAC (ossia `fakecig`==False)
    - Il subset delle colonne tenuto è quello indicato nel mapping.
    - Nelle colone di tipo float e int i Nan sono sostituito con lo 0.
    - Le date sono stringhe così composte "YYYY-MM-DD", non devono essere in formato datetime altrimenti ES non riesce a fare il parsing. Le date Nan sono trasformate in "0000-01-01".
    - Dopo queste modifiche si sostituiscono i rimanenti Nan con una stringa `" "`.
    - Si salva il risultato delle join (`data_poc`)
* `ESSearch.js`:
  > E' il file javascript da sostituire a quello presente [qui](https://github.com/teamdigitale/daf-anac-search/tree/master/src) per attivare la UI per i dati ANAC. Alcune funzionalità non funzionano, non ho avuto il tempo di indagare il perchè.
 
