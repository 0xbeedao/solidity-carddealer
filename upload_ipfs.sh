#! /bin/bash

set -e

cd assets
ipfs add -w --quiet tarot/rws/*png | tail -1 > tarot_rws_address.txt
ipfs add -w --quiet tarot/tdb/*jpg | tail -1 > tarot_tdb_address.txt
node prep-assets.js
mkdir -p json/rws
mkdir -p json/tdb
ipfs add -w --quiet json/rws/* | tail -1 > json_rws_address.txt
ipfs add -w --quiet json/tdb/* | tail -1 > json_tdb_address.txt
grep ^ *address.txt
