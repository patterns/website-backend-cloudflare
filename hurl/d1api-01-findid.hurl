GET https://api.cloudflare.com/client/v4/accounts/{{ CLOUDFLARE_ACC_ID }}/d1/database
Authorization: Bearer {{ CLOUDFLARE_TOKEN }}
HTTP 200
[Captures]
db_id: jsonpath "$.result[?(@.name == 'skybear-test-001')].uuid" nth 0
