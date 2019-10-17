# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "slik1_jekyll_theme"
  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README)}i) }

  spec.add_development_dependency "jekyll", "~> 4"
  spec.add_development_dependency "bundler", "~> 1.12"
end
