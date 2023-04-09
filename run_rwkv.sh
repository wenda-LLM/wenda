# /bin/bash
source setting.sh
if [ -z "$PYTHON" ]; then
    python rwkvAPI.py
else
    $PYTHON rwkvAPI.py
fi
