all: wasm_release


wasm_debug:
	wasm-pack build --profiling --target nodejs

wasm_release:
	wasm-pack build --target nodejs
	

update:
	cargo update

clean:
	cargo clean
	- rm -rf pkg


fmt:
	cargo fmt
	- prettier . --write

