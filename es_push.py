from elasticsearch import Elasticsearch


def connect_elasticsearch(host='localhost', port=9200):
	"""Connect to ES port

	:param host: name of ES host
	:param port: exposed port
	:return: ES object
	"""

	_es = None
	_es = Elasticsearch([{'host': host, 'port': port}])
	if _es.ping():
		print('Yay Connect')
	else:
		print('Awww it could not connect!')
	return _es


def create_index(es_object, file_mapping, index_name='anac'):
	"""Create a new index.

	:param es_object: object created with connect_elasticsearch
	:param file_mapping: file that contains the mapping of ES
	:param index_name: insert the name of the new index
	:return:
	"""
	created = False
	# index settings
	settings = {
		"settings": {
			"number_of_shards": 1,
			"number_of_replicas": 0
		},
		"mappings": file_mapping
	}
	try:
		if not es_object.indices.exists(index_name):
			# Ignore 400 means to ignore "Index Already Exist" error.
			es_object.indices.create(index=index_name, ignore=400,
									 body=settings)
			print('Created Index: ', index_name)
		created = True
	except Exception as ex:
		print(str(ex))
	finally:
		return created
