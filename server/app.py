from flask import Flask, jsonify, make_response, request,render_template,json
# from models import db, Users, Sherehe
from flask_cors import CORS
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from config import AppConfig
from flask_mpesa import MpesaAPI
import requests
from requests.auth import HTTPBasicAuth
# import request
app=Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"]='sqlite:///makao.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["API_ENVIRONMENT"] = "sandbox" 
app.config["APP_KEY"] = "gf8AI80pmqJWZHVx7huU4AGQfjenHlFL45NTwu8SW3dDcKBy" # App_key from developers portal
app.config["APP_SECRET"] = "zgT8B1NLh3jl5dsf6hKi5YieN2uIJQwwST1XKB1uVpRnuB479Gp2C3BRXyijsSBG" #App_Secret from developers portal

migrate = Migrate(app)
CORS(app, supports_credentials=True, allow_headers=["*"], methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"])
mpesa_api=MpesaAPI(app)
# mpesa_api.init_app(app)
# db.init_app(app)
consumer_key='gf8AI80pmqJWZHVx7huU4AGQfjenHlFL45NTwu8SW3dDcKBy'
consumer_secret='zgT8B1NLh3jl5dsf6hKi5YieN2uIJQwwST1XKB1uVpRnuB479Gp2C3BRXyijsSBG'

base_url = "https://4c3d-196-200-37-147.ngrok-free.app" 


@app.route("/")
def ResponseRoute():
    response = requests.request("GET", 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', headers = { 'Authorization': 'Basic Z2Y4QUk4MHBtcUpXWkhWeDdodVU0QUdRZmplbkhsRkw0NU5Ud3U4U1czZERjS0J5OnpnVDhCMU5MaDNqbDVkc2Y2aEtpNVlpZU4ydUlKUXd3U1QxWEtCMXVWcFJudUI0NzlHcDJDM0JSWHlpanNTQkc=' })
    print(response.text.encode('utf8'))
    return  make_response(response.text, 200)

@app.route('/access_token')
def token():
    data= ac_token()
    return data
    

def ac_token():
    mpesa_auth_url='https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'

    response = requests.get(mpesa_auth_url,auth= HTTPBasicAuth(consumer_key,consumer_secret))
    data=response.json()
    return data['access_token']

@app.route('/register_urls', methods=['POST', 'GET'])
def register():
    print(f"Request Method: {request.method}")
    print(f"Content-Type: {request.content_type}")
    print(f"JSON Body: {request.json}")
    mpesa_endpoint = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl"
    headers = {
        "Authorization": f"Bearer {ac_token()}",
        "Content-Type": "application/json"
    }
    base_url = "https://4c3d-196-200-37-147.ngrok-free.app"

    req_body = {
        "ShortCode": "600989",
        "ResponseType": "Completed",
        "ConfirmationUrl": base_url + "/c2b/confirm",
        "ValidationURL": base_url + "/c2b/validate"
    }
    
    response_data = requests.post(
        mpesa_endpoint,
        json=req_body,
        headers=headers
    )

    return response_data.json()


@app.route('/c2b/confirm', methods=['POST'])
def confirm():
    # Handle confirmation callback
    json_data = request.get_json()
    print("Confirmation Data:", json_data)
    return jsonify({"message": "Confirmation received."}), 200

@app.route('/c2b/validate', methods=['POST'])
def validate():
    # Handle validation callback
    json_data = request.get_json()
    print("Validation Data:", json_data)
    return jsonify({"message": "Validation received."}), 200

@app.route('/transact/mpesaexpress')
def simulate_stk_push():
    data = {
        "business_shortcode": "174379", #from developers portal
        "passcode": "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",#from developers portal
        "amount": "1", # choose amount preferrably KSH 1
        "phone_number":"254741065519", #phone number to be prompted to pay
        "reference_code": "HelloWorld",#Code to inform the user of services he/she is paying for.
        "callback_url": "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query", # cllback url should be exposes. for testing putposes you can route on host 0.0.0.0 and set the callback url to be https://youripaddress:yourport/endpoint
        "description": "Hello World" #a description of the transaction its optional
    }
    resp = mpesa_api.MpesaExpress.stk_push(**data)  # ** unpacks the dictionary
    ##use resp to capture the response
    try:
        resp = mpesa_api.MpesaExpress.stk_push(**data)
        print("Response:", resp)  # Debug print
        return resp
    except Exception as e:
        print("Error:", str(e))  # Debug print
        return jsonify({"error": str(e)}), 500

@app.route('/callback-url',methods=["POST"])
def callback_url():
    #get json data set to this route
    json_data = request.get_json()
    #get result code and probably check for transaction success or failure
    result_code=json_data["Body"]["stkCallback"]["ResultCode"]
    message={
        "ResultCode":json_data['ResultCode'],
        "ResultDesc":"success",
        "ThirdPartyTransID":"h234k2h4krhk2"
    }
    #if result code is 0 you can proceed and save the data else if its any other number you can track the transaction
    return jsonify(message),200

@app.route('/transact/c2b')
def c2b_transact():
    base_url = "https://4c3d-196-200-37-147.ngrok-free.app"
    reg_data={"shortcode": "9234375",
          "response_type": "Completed",
          "confirmation_url": base_url + "/c2b/confirm",
          "validation_url": base_url + "/c2b/validate"
    }
    v=mpesa_api.C2B.register(**reg_data)  # ** unpacks the dictionary
    ##use v to capture the response


    #This method allows you to test a mock payment and see the result so it can be avoided in production mode.
    test_data={"shortcode": "9234375",
           "command_id": "CustomerPayBillOnline",
           "amount": "1",
           "msisdn": "254741065519",
           "bill_ref_number": "account"
    }
    new_v = mpesa_api.C2B.simulate(**test_data)  # ** unpacks the dictionary
    #use new_v to capture the response
    return new_v

@app.route('/confirmation',methods=["POST"])
def c2b_confirmation():
    #save the data
    request_data = request.data

    #Perform your processing here e.g. print it out...
    print(request_data)


if __name__ == "__main__":
    app.run(debug=True, port=5500, host='0.0.0.0')


    


