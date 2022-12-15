const configureTagFormat = (o) => {
  let tag = o.tag.format;
  if (o.tag.prefixed === true) {
    tag = `v${tag}`
  }
  return {
    tagFormat: [
      tag
    ]
  }
}

module.exports = {
  configureTagFormat
}
