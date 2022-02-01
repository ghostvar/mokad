'use strict'
const cheerio = require('cheerio');

module.exports = function(html) {
  let $ = cheerio.load(html);
  
  let transkip_nilai = [];
  let indexing = {};

  $('table.table-common tr').each(function(i, elem) {
    let obj = {};
    $(this).find('th').each(function(ii, elemi) {
      indexing[ii] = $(this).text().replaceAll(' ', '_');
    });
    $(this).find('td').each(function(ii, elemi) {
      obj[indexing[ii]] = $(this).text();
    });
    if(i != 0)
      transkip_nilai.push(obj);
  });

  let detail_informasi = {};
  $('table.table-list tr').each(function(i, elem) {
    detail_informasi[$(this).find('th').text().replaceAll(' ', '_')] = $(this).find('td').text();
  });

  let prestasi_akademik = {};
  $('table').map(function(i, el) {
    if(i == 2) {
      let key = null;
      $(el).find('tr > td').each(function(ii, elemi) {
        if(ii % 2 == 0) key = $(this).text().replaceAll(' ', '_');
        else prestasi_akademik[key] = parseFloat($(this).text().replaceAll(':', '').trim());
      });
    }
  });

  const data = {
    prestasi_akademik,
    detail_informasi,
    transkip_nilai,
  };

  return data;
}