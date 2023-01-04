export const urls = {
  token: '491b7f3cb9dea79c122ff53e7e8601077c7cb758314c2f0b77503fcffd252e14',
  url: 'http://0.0.0.0:8000/js/walker_run',
  snt: "urn:uuid:90b3b1fd-1f1e-45a0-9eeb-7b30ac67f54f",
}



export async function HttpRequest(name: string, ctx: object | FormDataEntryValue | null) {
  let apiUrl = "http://0.0.0.0:8000/js/walker_run";
  let res = await fetch(apiUrl, {
    headers: {
      "Authorization": `Token ${urls.token}`,
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      name: name,
      ctx: ctx,
      _req_ctx: {},
      snt: urls.snt,
      profiling: false,
      is_async: false,
    }),

  });

  let data = await res.json();
  return data;
}


