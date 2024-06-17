import torch
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline


 
MODEL_ID = "distil-whisper/distil-large-v2"  # Test out the different model sizes here
TORCH_DTYPE = torch.float16 if torch.cuda.is_available() else torch.float32
PROCESSOR = AutoProcessor.from_pretrained(MODEL_ID)


DEVICE = "cuda:0" if torch.cuda.is_available() else "cpu"


model_short = AutoModelForSpeechSeq2Seq.from_pretrained(
    MODEL_ID, torch_dtype=TORCH_DTYPE, low_cpu_mem_usage=True, use_safetensors=True
)
model_short.to(DEVICE)



model_long = AutoModelForSpeechSeq2Seq.from_pretrained(
    MODEL_ID, torch_dtype=TORCH_DTYPE, low_cpu_mem_usage=True, use_safetensors=True
)

model_long.to(DEVICE)



pipe_short = pipeline(
        "automatic-speech-recognition",
        model=model_short,
        tokenizer=PROCESSOR.tokenizer,
        feature_extractor=PROCESSOR.feature_extractor,
        max_new_tokens=128,
        torch_dtype=TORCH_DTYPE,
        device=DEVICE,
    )

pipe_long = pipeline(
    "automatic-speech-recognition",
    model=model_long,
    tokenizer=PROCESSOR.tokenizer,
    feature_extractor=PROCESSOR.feature_extractor,
    max_new_tokens=128,
    chunk_length_s=25, # difference
    batch_size=16, # difference
    torch_dtype=TORCH_DTYPE,
    device=DEVICE,
)
    