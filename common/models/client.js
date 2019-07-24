// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = function(Client) {
    Client.remoteMethod(
        'getByName', 
        {
            description: 'get name like -> gina',
            accepts:[
                {arg: 'firstname', type: 'string'}
            ],
            returns: {
                arg: 'res', type: 'object', root: true
            },
            http: { path: '/getByName', verb: 'get'}
        }
    );
    Client.getByName = function(firstname, callback){
        new Promise(function(resolve, reject){ //fungsi promise untuk menjalankan code sesuai dengan urutannya
            
            var filter = {
                where: {
                    nama_client : { //nama field
                        like : firstname
                    }
                }
            }
            Client.find(filter, function(err, result){
                if(err) reject (err)
                if (result === null){
                    err = new Error('Cannot find that name')
                    err.statusCode = 404
                    reject (err)
                }

                resolve (result)
            })
        }).then(function(res){
            if (!res) callback (err)
            return callback (null, res)
        }).catch(function(err){
            callback(err);
        });
    }
    
};
