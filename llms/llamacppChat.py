from llama_cpp import Llama


llm = Llama(
    model_path='../../Meta-Llama-3-8B-Instruct-Q4_K_M.gguf',
    n_gpu_layers=-1,  # Uncomment to use GPU acceleration
    #n_batch = 512,
    use_mlock=True,
    flash_attn=True,
    #rope_freq_base=0,
    #rope_freq_scale=0,
    #n_threads=4,
    n_ctx=1024,  # Uncomment to increase the context window
)


output = llm.create_chat_completion(
      messages = [
        {
          "role": "system",
          "content": "A chat between a curious user and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the user's questions. The assistant calls functions with appropriate input when necessary"

        },
        {
          "role": "user",
          "content": "介绍下你自己"
        }
      ]
)

print(output["choices"][0]['message']['content'])