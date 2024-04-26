path = "./bert_classifier_model.pth"

from flask import Flask, request, jsonify
from flask_cors import CORS
from kobert_tokenizer import KoBERTTokenizer
from transformers import BertModel
import torch
import torch.nn.functional as F
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import gluonnlp as nlp
import numpy as np
from model.model_7emotion import BERTClassifier
from model.dataset import BERTDataset
from collections import OrderedDict
import random
import pandas as pd

app = Flask(__name__)
CORS(app)

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
bertmodel = BertModel.from_pretrained('skt/kobert-base-v1', return_dict=False)
tokenizer = KoBERTTokenizer.from_pretrained('skt/kobert-base-v1')
vocab = nlp.vocab.BERTVocab.from_sentencepiece(tokenizer.vocab_file, padding_token='[PAD]')
tok = nlp.data.BERTSPTokenizer(tokenizer, vocab, lower = False)

model = BERTClassifier(bertmodel, hidden_size=768, num_classes=7, dr_rate=0.5).to(device)
state_dict = torch.load(path)['state_dict']
model.load_state_dict(state_dict, strict=False)
model.eval()

tesla_data = pd.read_excel('./data/tesla.xlsx')
tesla_data = tesla_data[["text", "emotion"]]
samsung_data = pd.read_excel('./data/samsungelec.xlsx')
samsung_data = samsung_data[["text", "emotion"]]

max_len = 64
batch_size = 64

# 이전 검색어 관리
history_list = []

def predict(text):
    data = [text, '0']
    dataset_another = [data]

    another_test = BERTDataset(dataset_another, 0, 1, tok, vocab, max_len, True, False)
    test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=batch_size, num_workers=5)

    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(test_dataloader):
        token_ids = token_ids.long().to(device)
        segment_ids = segment_ids.long().to(device)

        valid_length= valid_length
        label = label.long().to(device)

        out = model(token_ids, valid_length, segment_ids)

        test_eval = []
        
        for i in out:
            logits=i
            logits = logits.detach().cpu().numpy()

            if np.argmax(logits) == 0:
                test_eval.append(0)
            elif np.argmax(logits) == 1:
                test_eval.append(1)
            elif np.argmax(logits) == 2:
                test_eval.append(2)
            elif np.argmax(logits) == 3:
                test_eval.append(3)
            elif np.argmax(logits) == 4:
                test_eval.append(4)
            else:
                test_eval.append(5)
        print(text)
        print(test_eval)
        return test_eval[0]


@app.route('/api/v1/search', methods=['POST'])
def search():
    search_string = request.json.get('search', None)

    history_list.insert(0, search_string)

    if search_string == "tesla" or search_string == "Tesla" or search_string == "TESLA" or search_string == "테슬라":
        return_list = [0, 0, 0, 0, 0, 0, 0]

        for index, row in tesla_data.iterrows():
            return_list[predict(row['text'])] += 1
            print(return_list)
        
        print(return_list)
        return return_list
    
    elif search_string == "삼성전자" or search_string == "삼전":
        return_list = [0, 0, 0, 0, 0, 0, 0]

        for index, row in samsung_data.iterrows():
            return_list[predict(row['text'])] += 1
            print(return_list)
        
        print(return_list)
        return return_list
            

    else:
        return jsonify([0, 0, 0, 0, 0, 0, 0])


@app.route('/api/v1/history', methods=['GET'])
def get_history():
    global history_list

    history_list = list(OrderedDict.fromkeys(history_list))
    
    return jsonify(history_list)


if __name__ == '__main__':
    app.run(debug=True)
