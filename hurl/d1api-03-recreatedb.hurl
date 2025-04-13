POST https://api.cloudflare.com/client/v4/accounts/{{ CLOUDFLARE_ACC_ID }}/d1/database
Authorization: Bearer {{ CLOUDFLARE_TOKEN }}
[Options]
skip: {{ db_created }}
{
  "name": "skybear-test-001",
  "primary_location_hint": "weur"
}
HTTP 200
[Captures]
db_id: jsonpath "$.result.uuid"
