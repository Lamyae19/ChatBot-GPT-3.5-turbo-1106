from flask import Flask, render_template, request
import openai
import json

# Initialize the OpenAI API client

openai.api_key = 'YOUR APIKEY'

# Set up Flask app
app = Flask(__name__)

# Initialize conversation history list
conversation_history = []


# Define the home page route
@app.route("/")
def index():
    return render_template('chatbot.html')


@app.route("/chatbot", methods=["POST"])
def chatbot():
    prompt = request.json['user_input']

    conversation_history.append({"role": "user", "content": prompt})
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-1106",
        messages=conversation_history,

    )

    response = completion.choices[0].message

    # Append bot response to conversation history
    conversation_history.append({"role": "assistant", "content": str(response)})
    print(conversation_history)
    print(response)
    if response != None:
        return response
    else:
        return 'Failed to Generate response!'


# Start the Flask app
if __name__ == "__main__":
    app.run(debug=True)
