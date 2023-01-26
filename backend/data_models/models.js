exports.loginCredentials = function() {
    return {
        username: 'string',
        password: 'string'
    };
}

exports.changeUserUsername = function() {
    return {
        username: 'string',
        newusername: 'string'
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