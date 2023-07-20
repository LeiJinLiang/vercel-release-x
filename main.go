package main

import (
	"i18n/api"
	"net/http"

	"github.com/rs/cors"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/upload", api.Handler)

	handler := cors.Default().Handler(mux)

	http.ListenAndServe(":27149", handler)
}
