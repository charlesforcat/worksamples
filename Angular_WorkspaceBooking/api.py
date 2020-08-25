from flask import Flask, request
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import CORS, cross_origin
from json import dumps
from flask_jsonpify import jsonify

app = Flask(__name__)
api = Api(app)

CORS(app)

debug_mode = 1

response = {}  # must include 'availability status' (string) and either price estimate or message explaining unavailability (string)

parser = reqparse.RequestParser()

#parser.add_argument('rate', type=int, help='Rate to charge for this resource')
parser.add_argument('center_id', type=str)
parser.add_argument('instant', type=bool)
parser.add_argument('startdate', type=str)
parser.add_argument('starthour', type=str)
parser.add_argument('enddate', type=str)
parser.add_argument('endhour', type=str)
parser.add_argument('what', type=str)
parser.add_argument('howmany', type=int)


class Estimate(Resource):
    def get(self):
        args = parser.parse_args(strict=True)

        if(debug_mode):
                print("instant:", args['instant'])
                print("startdate:",args['startdate'])
              
        
        #return { 'startdate': args['startdate'], 'instant' : args['instant'] }
        available_code = "yes"
        best_offer = "€ 129"
        response = { 'available' : available_code, 'bestoffer' : best_offer }
        return response
        

#
##
## Actually setup the Api resource routing here
##
api.add_resource(Estimate, '/')



if __name__ == '__main__':
    app.run(port=5002)
