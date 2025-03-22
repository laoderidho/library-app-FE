export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const router = useRouter();

  const api = $fetch.create({
    baseURL: config.public.SERVER_API,
    credentials: "include",

    async onResponseError({response, request, options}){
      if(response.status === 401){
          const refresh = await $fetch<{data: {token: string}}>("auth/refresh-token", {
              method: "POST",
          }).catch(()=> null)

          let accessToken: string = ""

          if(!refresh){
            router.push("/auth/login")
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
