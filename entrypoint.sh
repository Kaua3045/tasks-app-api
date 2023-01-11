#!/bin/bash

sleep 10

npx sequelize db:migrate

exec "$@"