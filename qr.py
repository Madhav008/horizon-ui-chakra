import qrcode
from io import BytesIO
import base64
from flask import Flask, request, jsonify, send_file

app = Flask(__name__)

# Endpoint to generate and display the QR code
@app.route('/generate_qr', methods=['GET'])
def generate_qr():
    # UPI link
    upi_link = "upi://pay?pa=hariicic21@ibl&pn=128924361&cu=INR&tn=Pay+to+128924361&am=1.00&mc=0000&mode=04&tr=AIRPAY303249040"

    # Generate QR code image as base64 string
    qr_code_image = generate_qr_code(upi_link)

    # Display the QR code image
    return send_file(BytesIO(base64.b64decode(qr_code_image)), mimetype='image/png')

# Function to generate QR code and return the image as base64 string
def generate_qr_code(upi_link):
    qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_L, box_size=10, border=4)
    qr.add_data(upi_link)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")

    # Convert image to base64 string
    buffered = BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

    return img_str

if __name__ == "__main__":
    app.run(debug=True)
