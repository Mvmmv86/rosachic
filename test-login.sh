#!/bin/bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@rosachic.com","password":"admin123"}' \
  -s | head -50
