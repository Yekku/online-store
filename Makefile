.PHONY: help dev stop seed db-up db-down db-reset

.DEFAULT_GOAL := help

## help: Show this help message
help:
	@echo ""
	@echo "Online Store - Available commands:"
	@echo ""
	@grep -E '^## ' $(MAKEFILE_LIST) | sed 's/## /  make /' | sed 's/: /\t/'
	@echo ""

## dev: Start MongoDB and app (port 3001)
dev: db-up
	@echo "Waiting for MongoDB to be ready..."
	@sleep 2
	@lsof -i :3001 -t 2>/dev/null | xargs kill -9 2>/dev/null || true
	PORT=3001 npm run dev

## stop: Stop MongoDB container
stop: db-down
	@echo "Stopped MongoDB"

## db-up: Start MongoDB container
db-up:
	docker compose up -d

## db-down: Stop MongoDB container
db-down:
	docker compose down

## seed: Start MongoDB and seed sample data
seed: db-up
	@sleep 2
	npm run seed

## db-reset: Wipe database and reseed from scratch
db-reset: db-down
	docker compose up -d
	@sleep 3
	npm run seed
	@echo "Database reset complete"
