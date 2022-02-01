'use strict'
const cheerio = require('cheerio');

module.exports = function(html) {
  let $ = cheerio.load(html);

  let kartu_rencana_studi = [];
  let total_sks_diambil = 0;
  let indexing = {};

  let len_krs = $('table.table-common tr').length;
  $('table.table-common tr').each(function(i, elem) {
    let obj = {};
    $(this).find('th').each(function(ii, elemi) {
      indexing[ii] = $(this).text().replaceAll(' ', '_');
    });
    $(this).find('td').each(function(ii, elemi) {
      if(len_krs == i+1 && ii == 1) {
        // total sks
        total_sks_diambil = $(this).text();
      } else {
        obj[indexing[ii]] = $(this).text().trim();
      }
    });
    if(!(i == 0 || i+1 == len_krs))
      kartu_rencana_studi.push(obj);
  });

  let detail_informasi = {};
  $('table.table-list tr').each(function(i, elem) {
    detail_informasi[$(this).find('th').text().replaceAll(' ', '_')] = $(this).find('td').text();
  });

  const data = {
    detail_informasi,
    total_sks_diambil,
    kartu_rencana_studi,
  };

  return data;
};