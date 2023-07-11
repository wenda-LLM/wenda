from rwkv.model import RWKV
model_name="model\\RWKV-4-World-CHNtuned-7B-v1-20230709-ctx4096.pth"
RWKV(model=model_name, strategy='cuda fp16i8',
 convert_and_save_and_exit =model_name.replace(".pth","-i8.pth"))