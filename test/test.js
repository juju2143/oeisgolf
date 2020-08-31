const assert = require('assert');
const fs = require('fs');
const https = require('https');
const A = require("..");

describe('A()', function() {
    describe('#index', function(){
        fs.readdir("a", (err,files)=>{
            files.forEach((file)=>{
                let seq = file.split(".")[0]
                it("A"+seq, function(done){
                    this.timeout(60000);
                    this.slow(500);
                    https.get("https://oeis.org/search?q=id:A"+seq+"&fmt=json", res=>{
                        assert.equal(res.statusCode, 200, "Request to the OEIS failed")
                        assert.match(res.headers['content-type'], /^application\/json/, "Request to the OEIS failed")
                        res.setEncoding('utf8');
                        let rawData = '';
                        res.on('data', (chunk) => { rawData += chunk; });
                        res.on('end', () => {
                            try {
                                const parsed = JSON.parse(rawData);
                                assert.ok(parsed.results, "Can't find sequence");
                                let sequence = parsed.results[0].data.split(",");
                                let offset = ~~parsed.results[0].offset.split(",")[0];
                                for(i=0;i<sequence.length;i++)
                                {
                                    assert.strictEqual(n=A(seq,i+offset), s=parseInt(sequence[i]), `Sequence not identical: ${n} !== ${s} at i=${i+offset}`)
                                }
                                done();
                            } catch (e) {
                                done(e);
                            }
                        });
                    })
                });
            })
        })
    })
})