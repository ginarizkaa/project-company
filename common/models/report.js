// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var app = require('../../server/server')
module.exports = function(Report) {
    Report.remoteMethod(
        'getByDepartemen',
        {
            description: 'get departemen like -> Penjualan',
            accepts: [
                {arg: 'departemen', type: 'string'}
            ],
            returns: {
                arg: 'res', type: 'object', root: true
            },
            http: { path: '/getByDepartemen', verb: 'get'}
        }
    );
    Report.getByDepartemen = function(departemen, callback){
        new Promise(function(resolve, reject){
            var filter = {
                where: {
                    departemen : {
                        like : departemen
                    }
                }
            }
    
            Report.find(filter, function(err, result){
                if (err) reject (err)
                if (result === null){
                    err = new Error('Cannot find that department name')
                    err.statusCode = 404
                    reject (err)
                }
                resolve (result)
            })
        }).then(function(res){
            if (!res) callback (err)
            return callback(null, res)
        }).catch(function(err){
            callback(err);
        })
    }

    Report.remoteMethod(
        'getDetailById',
        {
            description: 'get detail by id',
            accepts: [
                {arg: 'id', type: 'string'}
            ],
            returns: {
                arg: 'res', type: 'object', root: true
            },
            http: { path: '/getDetailById', verb: 'get'}
        }
    );
    Report.getDetailById = function(id, callback){
        new Promise(function(resolve, reject){
            var filter = {
                where: {
                    id : id
                }
            }
    
            Report.find(filter, function(err, result){
                if (err) reject (err)
                if (result === null){
                    err = new Error('Cannot find that id')
                    err.statusCode = 404
                    reject (err)
                }
                resolve (result)
                
            })
        }).then(function(res){
            //console.log(res)
            var client = app.models.Client

            var clientId = res[0].clientId

            var filter = {
                where : {
                    id : clientId
                }
            }

            client.find(filter, function(err, resclient){
                if (err) reject (err)
                if (resclient === null){
                    err = new Error('Cannot find that id')
                    err.statusCode = 404
                    reject (err)
                }
                
                res[0].nama_client = resclient[0].nama_client
                res[0].asal_perusahaan = resclient[0].asal_perusahaan

                return callback(null, res)
            })
        }).catch(function(err){
            callback(err);
        })
    }
};
