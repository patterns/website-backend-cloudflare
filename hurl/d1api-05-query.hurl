POST https://api.cloudflare.com/client/v4/accounts/{{ CLOUDFLARE_ACC_ID }}/d1/database/{{ db_id }}/query
Authorization: Bearer {{ CLOUDFLARE_TOKEN }}
Content-Type: application/json
{"sql": "CREATE TABLE IF NOT EXISTS marvel (name TEXT, power INTEGER); SELECT name, type FROM sqlite_master ORDER BY name ASC;"}
HTTP 200

[Asserts]
jsonpath "$.success" == true
jsonpath "$.result[0].success" == true
jsonpath "$.result[0].results" count == 0
jsonpath "$.result[1].success" == true
jsonpath "$.result[1].results[0].name" == "_cf_KV"
jsonpath "$.result[1].results[0].type" == "table"
jsonpath "$.result[1].results[1].name" == "marvel"
jsonpath "$.result[1].results[1].type" == "table"

# SQL Duration in the Durable Object should be FAST! (less than 2ms)
jsonpath "$.result[0].meta.duration" < 2.0
jsonpath "$.result[1].meta.duration" < 2.0
