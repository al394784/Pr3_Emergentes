URL: 

https://eu-west-2.aws.data.mongodb-api.com/app/data-qkwvh/endpoint/data/v1



Snippet:

curl --location --request POST 'https://eu-west-2.aws.data.mongodb-api.com/app/data-qkwvh/endpoint/data/v1/action/findOne' \
--header 'Content-Type: application/json' \
--header 'Access-Control-Request-Headers: *' \
--header 'api-key: WMpuZ0ERUufK4wB3erVzEaQLe9iuMNWYNpHp31AYU3NliJfFq0YqU7wVHE2xswep
--data-raw '{
    "collection":"EDMA_Schema",
    "database":"EDMA",
    "dataSource":"EDMA",
    "projection": {"_id": 1}
}'




Colecciones:

-ClienteSchema
-EspecialistaSchema
-PostCliSchema
-PostEspSchema
-InformeSchema
