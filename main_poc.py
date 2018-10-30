import json

import pandas as pd


from es_push import connect_elasticsearch, create_index

"""Create ANAC index and push records to ES"""

join_total = pd.read_csv('data_poc.csv', sep='\t')
join_total.drop_duplicates('cig', inplace=True)
#del join_total['text']
#print (join_total['entities'])
with open('mapping.json') as f:
	file_mapping = json.load(f)

es = connect_elasticsearch()

# Create index
create_index(es, file_mapping, index_name='anac_poc')
# Push records to ES
for r in join_total.iterrows():
	if int(r[0]%10000) == 0:
		print (r[0])
	# Push the record
	es.index(index='anac_poc', doc_type='gara', id=int(r[0]), body=r[1].to_dict())

print("The upload of records to ES is done!")