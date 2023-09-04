exports.loginCredentials = function() {
    return {
      "type": "object",
      "properties": {
        "username": {
          "type": "string"
        },
        "password": {
          "type": "string"
        }
      },
      "required": [
        "username",
        "password"
      ]
    }
}

exports.changeUserUsername = function() {
    return {
      "type": "object",
      "properties": {
        "username": {
          "type": "string"
        },
        "newusername": {
          "type": "string"
        }
      },
      "required": [
        "username",
        "newusername"
      ]
    };
}

exports.registerShip = function() {
    return {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "choosed_route": {
            "type": "string"
          },
          "actual_position": {
            "type": "object",
            "properties": {
              "longitude": {
                "type": "number"
              },
              "latitude": {
                "type": "number"
              }
            },
            "required": [
              "longitude",
              "latitude"
            ]
          },
          "status": {
            "type": "string"
          },
          "owner": {
            "type": "string"
          }
        },
        "required": [
          "name",
          "choosed_route",
          "actual_position",
          "owner"
        ]
      }
}

exports.newShipOwner = function() {
  return {
    "type": "object",
    "properties": {
      "shipname": {
        "type": "string"
      },
      "newowner": {
        "type": "string"
      }
    },
    "required": [
      "shipname",
      "newowner"
    ]
  }
}

exports.newShipName = function() {
  return {
    "type": "object",
    "properties": {
      "shipname": {
        "type": "string"
      },
      "newname": {
        "type": "string"
      }
    },
    "required": [
      "shipname",
      "newname"
    ]
  }
}

exports.shipChangeRoute = function() {
  return {
    "type": "object",
    "properties": {
      "shipname": {
        "type": "string"
      },
      "newroute": {
        "type": "string"
      }
    },
    "required": [
      "shipname",
      "newroute"
    ]
  }
}

exports.shipChangePosition = function() {
  return {
    "type": "object",
    "properties": {
      "shipname": {
        "type": "string"
      },
      "newposition": {
        "type": "object",
        "properties": {
          "longitude": {
            "type": "number"
          },
          "latitude": {
            "type": "number"
          }},
        "required": [
          "longitude",
          "latitude"
        ]
      }
    },
    "required": [
      "shipname",
      "newposition"
    ]
  }
}