from rwkv.model import RWKV
model_name="model\\RWKV-4-Raven-7B-v10.pth"
RWKV(model=model_name, strategy='cuda fp16i8',
 convert_and_save_and_exit =model_name.replace(".pth","-i8.pth"))