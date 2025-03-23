export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const router = useRouter();

  const api = $fetch.create({
    baseURL: config.public.SERVER_API,
    credentials: "include",

    async onResponseError({response, request, options}){
      const requestUrl = typeof request === "string" ? request : request.url;

      if(response.status === 401){
          if (requestUrl.includes("/auth/login") || requestUrl.includes("/auth/register") ) {
            return Promise.reject(response);
          }
          const refresh = await $fetch<{data: {token: string}}>("auth/refresh-token", {
              method: "POST",
          }).catch(()=> null)

          let accessToken: string = ""

          if(!refresh){
            router.push("/auth/login")
            return
          }else{
            accessToken = refresh.data.token
            localStorage.setItem("access_token", accessToken)
          }

          return $fetch(request, {
            ...options,
            method: options.method as "GET" | "POST" | "PUT" | "DELETE",
            headers: {
              ...options.headers,
              Authorization: accessToken
            }
          })
      }

      return Promise.reject(response)
    }
  });

  return {
    provide: {
      api
    }
  };
});
