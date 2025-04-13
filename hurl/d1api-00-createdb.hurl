POST https://api.cloudflare.com/client/v4/accounts/{{ CLOUDFLARE_ACC_ID }}/d1/database
Authorization: Bearer {{ CLOUDFLARE_TOKEN }}
{
  "name": "skybear-test-001",
  "primary_location_hint": "weur"
}
HTTP *
[Captures]
db_created: jsonpath "$.success"
