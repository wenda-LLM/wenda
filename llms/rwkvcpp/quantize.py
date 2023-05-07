# Quantizes rwkv.cpp model file from FP32 or FP16.
# Available format names are in rwkv_cpp_shared_library.QUANTIZED_FORMAT_NAMES
# Usage: python quantize.py bin\Release\rwkv.dll C:\rwkv.cpp-169M-FP32.bin C:\rwkv.cpp-169M-Q4_2.bin Q4_2

import argparse
import rwkv_cpp_shared_library

def parse_args():
    format_names = rwkv_cpp_shared_library.QUANTIZED_FORMAT_NAMES

    parser = argparse.ArgumentParser(description='Quantize rwkv.cpp model file from FP32 or FP16')
    parser.add_argument('src_path', help='Path to FP32/FP16 checkpoint file')
    parser.add_argument('dest_path', help='Path to resulting checkpoint file, will be overwritten')
    parser.add_argument('format_name', help='Format name, one of ' + ', '.join(format_names), type=str, choices=format_names, default='Q4_2')
    return parser.parse_args()

def main() -> None:
    args = parse_args()

    library = rwkv_cpp_shared_library.load_rwkv_shared_library()

    library.rwkv_quantize_model_file(
        args.src_path,
        args.dest_path,
        args.format_name
    )

    print('Done')

if __name__ == "__main__":
    main()
