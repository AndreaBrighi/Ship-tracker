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
              "x": {
                "type": "integer"
              },
              "y": {
                "type": "integer"
              }
            },
            "required": [
              "x",
              "y"
            ]
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