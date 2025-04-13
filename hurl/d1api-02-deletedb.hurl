DELETE https://api.cloudflare.com/client/v4/accounts/{{ CLOUDFLARE_ACC_ID }}/d1/database/{{ db_id }}
Authorization: Bearer {{ CLOUDFLARE_TOKEN }}
[Options]
skip: {{ db_created }}
HTTP 200
