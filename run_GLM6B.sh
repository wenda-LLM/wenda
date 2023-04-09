# /bin/bash
source setting.sh
if [ -z "$PYTHON" ]; then
    python GLM6BAPI.py
else
    $PYTHON GLM6BAPI.py
fi
