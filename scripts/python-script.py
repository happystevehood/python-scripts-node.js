import json
import sys
from sklearn.pipeline import make_pipeline #you can import and use any of installed pip libs

def first_function():
    """
    This function is called by node.js and it is given a location of json file as an argument.
    It reads the file, calculates something (in this case it is just example of data to return)
    and writes the result to another file.
    """
    json_obj = open(sys.argv[2]) #sys.argv[2] - location of the json file
    data = json.load(json_obj) #loading the json file
    calculatedResults = [1,2,4,3] # it is just example of data to return, in fact you will calculate it bellow
    X = data["X"] # getting the X from the json file
    y = data["y"] # getting the y from the json file
    # do some your calculations based on X and y and put the result to the calculatedResults
    # print(make_pipeline)
    json_object_result = json.dumps(calculatedResults, indent=4) #dumping the calculatedResults to the json format

    with open(sys.argv[3], "w") as outfile:
        outfile.write(json_object_result) #writing the result to the file

    # this OK gets passed back to the index.js file, and used for judgement pruprose.    
    print("OK")


if sys.argv[1] == 'first_function':
    first_function()

sys.stdout.flush()