#!/bin/bash
source setting.sh
if [ -z "$PYTHON" ]; then
    python plugins/gen_data_${zsk_type}.py
else
    $PYTHON plugins/gen_data_${zsk_type}.py
fi
