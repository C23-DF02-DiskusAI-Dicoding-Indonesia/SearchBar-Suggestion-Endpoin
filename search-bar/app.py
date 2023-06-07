import json
import numpy as np
from flask import Flask, request, jsonify, render_template
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np
from tensorflow.keras.preprocessing.sequence import pad_sequences
from flask import Flask, render_template, request
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.text import tokenizer_from_json


app = Flask(__name__)

model = load_model('model.h5')
with open('tokenizer.json') as f:
    tokenizer = tokenizer_from_json(json.load(f))


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/suggest', methods=['POST'])
def suggest():
    query = request.form['query']
    token_list = tokenizer.texts_to_sequences([query])[0]
    token_list = pad_sequences(
        [token_list], maxlen=model.input_shape[1], padding='pre')
    predicted = model.predict(token_list)
    predicted = np.argsort(-predicted)[0][:5]

    suggestions = []
    for index in predicted:
        for word, word_index in tokenizer.word_index.items():
            if word_index == index:
                suggestions.append(word)
                break
    return jsonify({'suggestions': suggestions})


if __name__ == '__main__':
    app.run()
