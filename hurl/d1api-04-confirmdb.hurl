GET https://api.cloudflare.com/client/v4/accounts/{{ CLOUDFLARE_ACC_ID }}/d1/database/{{ db_id }}
Authorization: Bearer {{ CLOUDFLARE_TOKEN }}
HTTP 200
[Asserts]
jsonpath "$.success" == true
jsonpath "$.result.uuid" == {{ db_id }}
jsonpath "$.result.name" == "skybear-test-001"
jsonpath "$.result.running_in_region" == "WEUR"
