#!/bin/bash

#s3cmd --exclude=".git/*" sync --recursive --cf-invalidate --cf-invalidate-default-index --default-mime-type="text/html" --guess-mime-type ~/amberstones.net/yellowButton/web/* s3://yellow-button-web

TOP="/Users/k_bluehack/kioskpos/KP-api"
cp $TOP/spec/kiosk-api.yaml $TOP/ui
s3cmd sync --exclude=".git/*" --exclude="node_modules/*" --recursive --default-mime-type="text/html" --guess-mime-type $TOP/ui/* s3://kiosk-api -c ~/.s3cfg
