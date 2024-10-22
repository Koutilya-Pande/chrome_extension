from flask import Flask, jsonify
import subprocess

app = Flask(__name__)

@app.route('/scrape', methods=['GET'])
def scrape():
    try:
        # Run your Python script
        result = subprocess.run(['python', 'scrape.py'], capture_output=True, text=True)
        return jsonify({'data': result.stdout}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)  # You can change the port if needed
