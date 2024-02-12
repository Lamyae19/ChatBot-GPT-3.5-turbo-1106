from flask import Flask, render_template, request
import openai

# Initialize the OpenAI API client
openai.api_key = "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"


# Set up Flask app
app = Flask(__name__)

# Define the home page route
@app.route("/")
def index():
    return render_template('chatbot.html')

@app.route("/chatbot", methods=["POST"])
def chatbot():
    prompt = request.json['user_input']


    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-1106",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    if completion.choices[0].message!=None:
        return completion.choices[0].message

    else :
        return 'Failed to Generate response!'

# Start the Flask app
if __name__ == "__main__":
    app.run(debug=True)
