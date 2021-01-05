Demos used by [Python Contract Tutorials](https://uuos.io/static/tutorials.html)


# Starting from a local webserver

```bash
git clone https://github.com/uuosio/python-contract-demos
cd python-contract-demos
python3 -m pip install livereload
livereload .
```

# Running demo with UUOSKit

First install [UUOSKit](https://github.com/uuosio/uuoskit), then use the following command to run the demos.

```bash
cd tests
python3 test_runner.py --test-dir test_helloworld
```
