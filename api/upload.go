package api

import (
	"encoding/csv"
	"encoding/json"
	"net/http"
	"strings"
)

type Record map[string]string

func Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	file, _, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Invalid file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	reader := csv.NewReader(file)
	lines, err := reader.ReadAll()
	if err != nil {
		http.Error(w, "Error reading file", http.StatusInternalServerError)
		return
	}

	records := make(map[string]Record)
	headers := lines[0]
	for _, line := range lines[1:] {
		localKey := strings.TrimSpace(line[0])
		record := make(Record)
		for i, value := range line[1:] {
			header := strings.TrimSpace(headers[i+1])
			trimmedValue := strings.TrimSpace(value)
			if trimmedValue != "" {
				record[header] = trimmedValue
			}
		}
		if len(record) > 0 {
			records[localKey] = record
		}
	}

	jsonData, err := json.Marshal(records)
	if err != nil {
		http.Error(w, "Error converting to JSON", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonData)
}
