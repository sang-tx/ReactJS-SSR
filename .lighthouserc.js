let assertions = {
  'cumulative-layout-shift': ['error', { 'maxNumericValue': 0.045 }],
  'unused-css-rules': ['error', { 'maxLength': 6 }],
  'resource-summary:font:count': ['error', { 'maxNumericValue': 7 }],
  'resource-summary:document:size': ['error', { 'maxNumericValue': 110000 }],
  'resource-summary:script:size': ['error', { 'maxNumericValue': 1300000 }],
  'resource-summary:stylesheet:size': ['error', { 'maxNumericValue': 300000 }],
  'offscreen-images': ['error', { 'maxLength': 1 }],
  'modern-image-formats': ['error', { 'maxLength': 1 }],
  'uses-rel-preconnect': ['error', { 'minScore': 1 }],
  'uses-responsive-images': ['error', { maxLength: 0 }],
  'total-byte-weight': ['error', { 'minScore': 0.9 }],
  'critical-request-chains': ['error', { 'maxLength': 7 }],
  'font-display': ['error', { 'minScore': 1 }],

  'color-contrast': ['error', { 'minScore': 1 }],
  'link-name': ['error', { 'minScore': 1 }],
  'heading-order': ['error', { 'minScore': 1 }],

  'tap-targets': ['error', { 'minScore': 1 }]
}

module.exports = {
  ci: {
    assert: {
      assertions
    }
  }
}
